# ParkhausBasel SDK utility: feature_add
module ParkhausBaselUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
