# ParkhausBasel SDK feature factory

from feature.base_feature import ParkhausBaselBaseFeature
from feature.test_feature import ParkhausBaselTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ParkhausBaselBaseFeature(),
        "test": lambda: ParkhausBaselTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
