"""Build the HaatSetu artisan app (APK) without Gradle: aapt2 -> javac -> d8 -> zipalign -> apksigner.

Needs JDK 17+ and the Android SDK (platforms;android-35, build-tools;35.0.0). The SDK is taken from ANDROID_HOME,
or from --sdk. Output: mobile_app/build/HaatSetu.apk, signed with a local debug key kept next to the SDK
(never in this repo).

    python mobile_app/build_apk.py --sdk D:/CodeApex/_local/android
    python mobile_app/build_apk.py --sdk ... --server https://haatsetu-api.onrender.com
    python mobile_app/build_apk.py --sdk ... --release --server https://...     not debuggable, HTTPS only

--server only sets the API address the app starts with; it can be changed in the app's Settings at any time.
Leave it out and the app opens in demo mode (sample data, works offline).
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

APP = Path(__file__).resolve().parent
OUT = APP / "build"
EXE = ".exe" if os.name == "nt" else ""
BAT = ".bat" if os.name == "nt" else ""


def java_home() -> Path:
    for c in [os.environ.get("JAVA_HOME", ""), r"C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"]:
        if c and (Path(c) / "bin" / f"javac{EXE}").exists():
            return Path(c)
    sys.exit("JDK not found: set JAVA_HOME to a JDK 17 or newer")


def run(*cmd, env=None):
    print(">", " ".join(Path(str(c)).name if i == 0 else str(c) for i, c in enumerate(cmd[:2])), "...")
    subprocess.run([str(c) for c in cmd], check=True, env=env)


def main() -> None:
    ap = argparse.ArgumentParser(description="Build the HaatSetu Android app")
    ap.add_argument("--sdk", default=os.environ.get("ANDROID_HOME", ""), help="Android SDK folder")
    ap.add_argument("--server", default="", help="API address the app starts with, e.g. https://haatsetu-api.onrender.com")
    ap.add_argument("--release", action="store_true", help="not debuggable, no plain HTTP")
    a = ap.parse_args()

    sdk = Path(a.sdk) if a.sdk else None
    if sdk is None:
        sys.exit("Android SDK not set: pass --sdk or set ANDROID_HOME")
    bt, jar = sdk / "build-tools" / "35.0.0", sdk / "platforms" / "android-35" / "android.jar"
    if not jar.exists() or not bt.exists():
        sys.exit(f"Android SDK not found in {sdk}: install platforms;android-35 and build-tools;35.0.0")
    server = a.server.strip().rstrip("/")
    if server and not server.startswith(("http://", "https://")):
        sys.exit("--server must start with http:// or https://")
    if a.release and server.startswith("http://"):
        sys.exit("a release build only allows HTTPS")

    jh = java_home()
    env = dict(os.environ, JAVA_HOME=str(jh), PATH=str(jh / "bin") + os.pathsep + os.environ["PATH"])
    shutil.rmtree(OUT, ignore_errors=True)
    (OUT / "classes").mkdir(parents=True)

    # 0. staged assets with the one build-time setting, and the manifest for this build type
    shutil.copytree(APP / "assets", OUT / "assets")
    (OUT / "assets" / "config.js").write_text(
        "// Written by build_apk.py\n"
        f"window.HS_CONFIG = {json.dumps({'defaultServer': server, 'release': a.release})};\n", encoding="utf-8")
    manifest = (APP / "AndroidManifest.xml").read_text(encoding="utf-8")
    if a.release:
        manifest = (manifest.replace('android:debuggable="true"', 'android:debuggable="false"')
                    .replace('android:usesCleartextTraffic="true"', 'android:usesCleartextTraffic="false"'))
    (OUT / "AndroidManifest.xml").write_text(manifest, encoding="utf-8")

    # 1. resources + manifest + assets
    run(bt / f"aapt2{EXE}", "compile", "--dir", APP / "res", "-o", OUT / "res.zip")
    run(bt / f"aapt2{EXE}", "link", "-o", OUT / "base.apk", "-I", jar, "--manifest", OUT / "AndroidManifest.xml",
        "-A", OUT / "assets", "--java", OUT / "gen", OUT / "res.zip")
    # 2. Java -> classes -> dex
    srcs = [str(p) for p in (APP / "src").rglob("*.java")] + [str(p) for p in (OUT / "gen").rglob("*.java")]
    run(jh / "bin" / f"javac{EXE}", "--release", "11", "-Xlint:-deprecation", "-classpath", jar, "-d", OUT / "classes",
        *srcs, env=env)
    classes = [str(p) for p in (OUT / "classes").rglob("*.class")]
    run(bt / f"d8{BAT}", "--min-api", "24", "--lib", jar, "--output", OUT, *classes, env=env)
    with zipfile.ZipFile(OUT / "base.apk", "a") as z:
        z.write(OUT / "classes.dex", "classes.dex")
    # 3. align + sign with a debug key created once next to the SDK, so it never lands in git
    run(bt / f"zipalign{EXE}", "-f", "-p", "4", OUT / "base.apk", OUT / "aligned.apk")
    ks = sdk / "haatsetu-debug.keystore"
    if not ks.exists():
        run(jh / "bin" / f"keytool{EXE}", "-genkeypair", "-keystore", ks, "-alias", "haatsetu", "-keyalg", "RSA",
            "-keysize", "2048", "-validity", "10000", "-storepass", "android", "-keypass", "android",
            "-dname", "CN=HaatSetu Debug,O=HaatSetu,C=IN", env=env)
    apk = OUT / "HaatSetu.apk"
    run(bt / f"apksigner{BAT}", "sign", "--ks", ks, "--ks-pass", "pass:android", "--key-pass", "pass:android",
        "--out", apk, OUT / "aligned.apk", env=env)
    run(bt / f"apksigner{BAT}", "verify", apk, env=env)
    print(f"\nAPK: {apk}  ({apk.stat().st_size // 1024} KB)  {'release' if a.release else 'development'} build; "
          f"API: {server or '(none: demo mode until set in Settings)'}")


if __name__ == "__main__":
    main()
