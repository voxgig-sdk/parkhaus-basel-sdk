# ParkhausBasel SDK utility: make_context
require_relative '../core/context'
module ParkhausBaselUtilities
  MakeContext = ->(ctxmap, basectx) {
    ParkhausBaselContext.new(ctxmap, basectx)
  }
end
