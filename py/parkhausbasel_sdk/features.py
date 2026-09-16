# ParkhausBasel SDK feature factory

from parkhausbasel_sdk.feature.base_feature import ParkhausBaselBaseFeature
from parkhausbasel_sdk.feature.ratelimit_feature import ParkhausBaselRatelimitFeature
from parkhausbasel_sdk.feature.retry_feature import ParkhausBaselRetryFeature
from parkhausbasel_sdk.feature.test_feature import ParkhausBaselTestFeature
from parkhausbasel_sdk.feature.timeout_feature import ParkhausBaselTimeoutFeature


_FEATURES = {
    "base": lambda: ParkhausBaselBaseFeature(),
    "ratelimit": lambda: ParkhausBaselRatelimitFeature(),
    "retry": lambda: ParkhausBaselRetryFeature(),
    "test": lambda: ParkhausBaselTestFeature(),
    "timeout": lambda: ParkhausBaselTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
