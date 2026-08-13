# ParkhausBasel SDK utility: make_context

from projectname_sdk.core.context import ParkhausBaselContext


def make_context_util(ctxmap, basectx):
    return ParkhausBaselContext(ctxmap, basectx)
