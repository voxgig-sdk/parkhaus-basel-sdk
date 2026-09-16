# ParkhausBasel SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ParkhausBaselFeatures
  def self.make_feature(name)
    case name
    when "base"
      ParkhausBaselBaseFeature.new
    when "ratelimit"
      ParkhausBaselRatelimitFeature.new
    when "retry"
      ParkhausBaselRetryFeature.new
    when "test"
      ParkhausBaselTestFeature.new
    when "timeout"
      ParkhausBaselTimeoutFeature.new
    else
      ParkhausBaselBaseFeature.new
    end
  end
end
