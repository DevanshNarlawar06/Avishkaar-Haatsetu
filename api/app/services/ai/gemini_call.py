"""One Gemini text/audio call that survives a busy model.

Free-tier models return 503 "high demand" or 429 often enough to break a live
demo. Each busy model gets one short retry, then the next model in
GEMINI_FALLBACK_MODELS is tried; a retired model (404) is skipped at once. Any other
error is raised.
"""

from __future__ import annotations

import time

from app.core.config import settings
from app.core.logging import get_logger

log = get_logger(__name__)

BUSY = ("503", "UNAVAILABLE", "429", "RESOURCE_EXHAUSTED", "overloaded", "high demand")
# A retired or unknown model: no point retrying it, go straight to the next one.
GONE = ("404", "NOT_FOUND", "no longer available")


def _busy(exc: Exception) -> bool:
    text = str(exc)
    return any(marker in text for marker in BUSY)


def models_to_try() -> list[str]:
    extra = [m.strip() for m in settings.GEMINI_FALLBACK_MODELS.split(",") if m.strip()]
    return list(dict.fromkeys([settings.GEMINI_MODEL, *extra]))


def generate(client, **kwargs):
    """client.models.generate_content(model=..., **kwargs), with fallbacks."""
    last: Exception | None = None
    for model in models_to_try():
        for attempt in range(2):
            try:
                return client.models.generate_content(model=model, **kwargs)
            except Exception as exc:  # noqa: BLE001 - upstream raises many types
                if any(marker in str(exc) for marker in GONE):
                    last = exc
                    log.warning("gemini_model_unavailable", model=model, error=str(exc)[:160])
                    break
                if not _busy(exc):
                    raise
                last = exc
                log.warning("gemini_busy", model=model, attempt=attempt + 1, error=str(exc)[:160])
                if attempt == 0:
                    time.sleep(1.5)
    assert last is not None
    raise last
