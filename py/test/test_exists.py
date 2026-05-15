# ProjectName SDK exists test

import pytest
from parkhausbasel_sdk import ParkhausBaselSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ParkhausBaselSDK.test(None, None)
        assert testsdk is not None
