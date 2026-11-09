"""Colour, exposure and framing for e commerce.

Small and unglamorous, and the highest quality per line in the whole image
pipeline. A phone photo taken under a bare bulb reads as amateur mostly because
of white balance, not resolution.
"""

from __future__ import annotations

import io

from app.core.errors import ProviderUnavailableError

# Marketplaces want square. Instagram wants 4:5. Both are supported.
ASPECTS = {"square": (1, 1), "portrait": (4, 5)}
MARGIN = 0.08


def _cv():
    try:
        import cv2

        return cv2
    except ImportError as exc:
        raise ProviderUnavailableError("opencv is not installed. pip install '.[ai]'") from exc


def auto_correct(image_bytes: bytes) -> bytes:
    """Grey world white balance, then CLAHE, then a gentle gamma lift."""
    import numpy as np

    cv2 = _cv()

    array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(array, cv2.IMREAD_COLOR)
    if image is None:
        raise ProviderUnavailableError("Could not decode image")

    balanced = cv2.xphoto.createGrayworldWB().balanceWhite(image)

    # CLAHE on the lightness channel only. Applying it to R, G and B
    # independently wrecks colour, and that is the usual mistake here.
    lab = cv2.cvtColor(balanced, cv2.COLOR_BGR2LAB)
    lightness, a, b = cv2.split(lab)
    lightness = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8)).apply(lightness)
    corrected = cv2.cvtColor(cv2.merge((lightness, a, b)), cv2.COLOR_LAB2BGR)

    table = np.array([((i / 255.0) ** (1 / 1.08)) * 255 for i in range(256)]).astype("uint8")
    corrected = cv2.LUT(corrected, table)

    ok, encoded = cv2.imencode(".jpg", corrected, [cv2.IMWRITE_JPEG_QUALITY, 92])
    if not ok:
        raise ProviderUnavailableError("Could not encode corrected image")
    return encoded.tobytes()


def compose_on_canvas(
    cutout_png: bytes,
    aspect: str = "square",
    background: tuple[int, int, int] = (255, 255, 255),
    shadow: bool = True,
) -> bytes:
    """Place a cutout on a clean canvas, with a soft contact shadow.

    The shadow matters more than it sounds. A cutout floating on pure white
    reads as fake. The same cutout with a soft shadow under it reads as studio.
    """
    try:
        from PIL import Image, ImageFilter
    except ImportError as exc:
        raise ProviderUnavailableError("pillow is not installed. pip install '.[ai]'") from exc

    product = Image.open(io.BytesIO(cutout_png)).convert("RGBA")
    product = product.crop(product.getbbox() or (0, 0, *product.size))

    ratio_w, ratio_h = ASPECTS.get(aspect, ASPECTS["square"])
    inner = 1 - 2 * MARGIN
    scale = min(
        (product.width / inner) / ratio_w,
        (product.height / inner) / ratio_h,
    )
    canvas_size = (int(ratio_w * scale), int(ratio_h * scale))
    canvas = Image.new("RGBA", canvas_size, (*background, 255))

    x = (canvas_size[0] - product.width) // 2
    y = (canvas_size[1] - product.height) // 2

    if shadow:
        blur = max(2, int(canvas_size[0] * 0.02))
        offset = int(canvas_size[1] * 0.02)
        alpha = product.split()[3].filter(ImageFilter.GaussianBlur(blur))
        shadow_layer = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
        shadow_layer.paste((0, 0, 0, 90), (x, y + offset), alpha)
        canvas = Image.alpha_composite(canvas, shadow_layer)

    canvas.paste(product, (x, y), product)

    buffer = io.BytesIO()
    canvas.convert("RGB").save(buffer, format="JPEG", quality=92)
    return buffer.getvalue()


def light_studio(image_bytes: bytes, size: int = 1200) -> bytes:
    """Pillow only: the last fallback, for a server without opencv or rembg.

    Upright, auto levels, a little colour and sharpness, square on a warm white
    margin. No background removal, but a phone photo still comes back brighter
    and better framed, so the artisan never sees "enhancement failed".
    """
    try:
        from PIL import Image, ImageEnhance, ImageOps
    except ImportError as exc:
        raise ProviderUnavailableError("Pillow is not installed") from exc

    try:
        img = ImageOps.exif_transpose(Image.open(io.BytesIO(image_bytes))).convert("RGB")
    except Exception as exc:  # unreadable upload
        raise ProviderUnavailableError(f"Could not read the photo: {exc}") from exc

    img = ImageOps.autocontrast(img, cutoff=1)
    img = ImageEnhance.Color(img).enhance(1.15)
    img = ImageEnhance.Sharpness(img).enhance(1.25)

    side = min(img.size)
    left, top = (img.width - side) // 2, (img.height - side) // 2
    img = img.crop((left, top, left + side, top + side))
    inner = round(size * (1 - 2 * MARGIN / 2))
    img = img.resize((inner, inner), Image.LANCZOS)

    canvas = Image.new("RGB", (size, size), (250, 247, 240))
    off = (size - inner) // 2
    canvas.paste(img, (off, off))
    out = io.BytesIO()
    canvas.save(out, "JPEG", quality=90)
    return out.getvalue()
