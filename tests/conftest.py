"""Windows compatibility for gltest 0.29.x's open-tempfile cleanup."""

import os


_unlink = os.unlink


def _unlink_after_close(path, *args, **kwargs):
    try:
        return _unlink(path, *args, **kwargs)
    except PermissionError as error:
        if getattr(error, "winerror", None) == 32:
            return None
        raise


os.unlink = _unlink_after_close
