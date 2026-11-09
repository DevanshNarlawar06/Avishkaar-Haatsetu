package com.haatsetu.app;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.ContentValues;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

/**
 * HaatSetu artisan app: a WebView shell around the bundled app in assets/.
 *  - The whole UI ships inside the APK, so the demo works with no network.
 *  - Live mode calls the HaatSetu API at the address saved in Settings (window.HaatSetuNative.setServer).
 *  - Microphone and camera are granted to the bundled pages only, after Android's own permission prompt.
 *  - "Choose photo" opens the camera or the gallery; photos taken here are saved to the phone's Pictures.
 */
public class MainActivity extends Activity {
    static final String ASSETS = "file:///android_asset/";
    static final int REQ_MEDIA = 7, REQ_FILE = 8;

    private WebView web;
    private SharedPreferences prefs;
    private PermissionRequest pendingPermission;
    private ValueCallback<Uri[]> fileCallback;
    private Uri cameraUri;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        prefs = getSharedPreferences("haatsetu", MODE_PRIVATE);
        WebView.setWebContentsDebuggingEnabled((getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0);

        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false);                 // bundled assets still load from file:///android_asset/
        s.setAllowContentAccess(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setTextZoom(100);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setWebViewClient(new Client());
        web.setWebChromeClient(new Chrome());
        web.addJavascriptInterface(new Bridge(), "HaatSetuNative");

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#F6F4EC"));
        root.addView(web, new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            if (Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets i = insets.getInsets(WindowInsets.Type.systemBars()
                        | WindowInsets.Type.displayCutout() | WindowInsets.Type.ime());
                v.setPadding(i.left, i.top, i.right, i.bottom);
                return WindowInsets.CONSUMED;
            }
            v.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(),
                    insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            return insets.consumeSystemWindowInsets();
        });
        setContentView(root);
        getWindow().setStatusBarColor(Color.parseColor("#133429"));
        getWindow().setNavigationBarColor(Color.parseColor("#F6F4EC"));

        if (state == null || web.restoreState(state) == null) web.loadUrl(ASSETS + "index.html");
    }

    static boolean bundled(String url) { return url != null && url.startsWith(ASSETS); }

    private class Client extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
            String url = req.getUrl().toString();
            if (bundled(url)) return false;
            String scheme = req.getUrl().getScheme() == null ? "" : req.getUrl().getScheme();
            if (scheme.equals("http") || scheme.equals("https") || scheme.equals("tel") || scheme.equals("mailto")
                    || scheme.equals("sms") || scheme.equals("whatsapp")) {
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, req.getUrl()).addCategory(Intent.CATEGORY_BROWSABLE));
                } catch (ActivityNotFoundException ignored) { }
            }
            return true;
        }
    }

    private class Chrome extends WebChromeClient {
        @Override
        public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
            return dialog(url, message, result, false);
        }

        @Override
        public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
            return dialog(url, message, result, true);
        }

        /** getUserMedia from the bundled pages: ask Android for the matching permission, then grant. */
        @Override
        public void onPermissionRequest(PermissionRequest request) {
            runOnUiThread(() -> {
                if (!bundled(request.getOrigin().toString() + "/") && !"file".equals(request.getOrigin().getScheme())) {
                    request.deny();
                    return;
                }
                List<String> need = new ArrayList<>();
                for (String r : request.getResources()) {
                    if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(r) && !has(Manifest.permission.RECORD_AUDIO))
                        need.add(Manifest.permission.RECORD_AUDIO);
                    if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(r) && !has(Manifest.permission.CAMERA))
                        need.add(Manifest.permission.CAMERA);
                }
                if (need.isEmpty()) {
                    request.grant(request.getResources());
                } else {
                    if (pendingPermission != null) pendingPermission.deny();
                    pendingPermission = request;
                    requestPermissions(need.toArray(new String[0]), REQ_MEDIA);
                }
            });
        }

        /** <input type="file" accept="image/*">: offer the camera and the gallery. */
        @Override
        public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
            if (fileCallback != null) fileCallback.onReceiveValue(null);
            fileCallback = callback;
            cameraUri = null;
            Intent pick = new Intent(Intent.ACTION_GET_CONTENT).addCategory(Intent.CATEGORY_OPENABLE).setType("image/*");
            Intent chooser = Intent.createChooser(pick, "Product photo");
            if (has(Manifest.permission.CAMERA)) {
                try {
                    ContentValues cv = new ContentValues();
                    cv.put(MediaStore.Images.Media.DISPLAY_NAME, "haatsetu_" + System.currentTimeMillis() + ".jpg");
                    cv.put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
                    if (Build.VERSION.SDK_INT >= 29) cv.put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/HaatSetu");
                    cameraUri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, cv);
                    if (cameraUri != null) {
                        Intent cam = new Intent(MediaStore.ACTION_IMAGE_CAPTURE).putExtra(MediaStore.EXTRA_OUTPUT, cameraUri)
                                .addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                        chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Intent[]{cam});
                    }
                } catch (Exception ignored) { cameraUri = null; }
            } else {
                requestPermissions(new String[]{Manifest.permission.CAMERA}, 0);
            }
            try {
                startActivityForResult(chooser, REQ_FILE);
            } catch (ActivityNotFoundException e) {
                fileCallback = null;
                return false;
            }
            return true;
        }
    }


    boolean has(String perm) { return checkSelfPermission(perm) == PackageManager.PERMISSION_GRANTED; }

    @Override
    public void onRequestPermissionsResult(int code, String[] perms, int[] results) {
        if (code != REQ_MEDIA || pendingPermission == null) return;
        PermissionRequest req = pendingPermission;
        pendingPermission = null;
        List<String> ok = new ArrayList<>();
        for (String r : req.getResources()) {
            if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(r) && has(Manifest.permission.RECORD_AUDIO)) ok.add(r);
            if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(r) && has(Manifest.permission.CAMERA)) ok.add(r);
        }
        if (ok.isEmpty()) req.deny(); else req.grant(ok.toArray(new String[0]));
    }

    @Override
    protected void onActivityResult(int code, int result, Intent data) {
        super.onActivityResult(code, result, data);
        if (code != REQ_FILE || fileCallback == null) return;
        Uri[] out = null;
        if (result == RESULT_OK) {
            if (data != null && data.getData() != null) out = new Uri[]{data.getData()};
            else if (cameraUri != null) out = new Uri[]{cameraUri};
        } else if (cameraUri != null) {
            try { getContentResolver().delete(cameraUri, null, null); } catch (Exception ignored) { }
        }
        fileCallback.onReceiveValue(out);
        fileCallback = null;
    }

    boolean dialog(String url, String message, JsResult result, boolean confirm) {
        if (!bundled(url) || isFinishing()) { result.cancel(); return true; }
        AlertDialog.Builder b = new AlertDialog.Builder(this).setMessage(message == null ? "" : message).setCancelable(true)
                .setOnCancelListener(d -> result.cancel())
                .setPositiveButton(android.R.string.ok, (d, w) -> result.confirm());
        if (confirm) b.setNegativeButton(android.R.string.cancel, (d, w) -> result.cancel());
        b.show();
        return true;
    }

    /** Called from the bundled pages only (the WebView never navigates anywhere else). */
    private class Bridge {
        @JavascriptInterface
        public String getServer() { return prefs.getString("server", ""); }

        @JavascriptInterface
        public String setServer(String url) {
            String u = url == null ? "" : url.trim();
            while (u.endsWith("/")) u = u.substring(0, u.length() - 1);
            Uri p = Uri.parse(u);
            String sc = p.getScheme();
            if (!u.isEmpty() && (sc == null || !(sc.equals("https") || (sc.equals("http") && isDebugBuild())) || p.getHost() == null))
                return "Use an https:// address";
            prefs.edit().putString("server", u).apply();
            return "";
        }

        @JavascriptInterface
        public boolean isDebugBuild() { return (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0; }

        @JavascriptInterface
        public void share(String text) {
            runOnUiThread(() -> {
                Intent i = new Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, text == null ? "" : text);
                try { startActivity(Intent.createChooser(i, "Share listing")); } catch (ActivityNotFoundException ignored) { }
            });
        }

        @JavascriptInterface
        public void toast(String text) {
            runOnUiThread(() -> Toast.makeText(MainActivity.this, text == null ? "" : text, Toast.LENGTH_SHORT).show());
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("window.hsBack ? window.hsBack() : false", v -> {
            if (!"true".equals(v)) MainActivity.super.onBackPressed();
        });
    }
}
