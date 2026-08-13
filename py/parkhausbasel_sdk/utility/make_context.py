# ParkhausBasel SDK utility: make_context

from parkhausbasel_sdk.core.context import ParkhausBaselContext


def make_context_util(ctxmap, basectx):
    return ParkhausBaselContext(ctxmap, basectx)
