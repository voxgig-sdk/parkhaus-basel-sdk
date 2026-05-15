# ParkhausBasel SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ParkhausBaselFeatures
  def self.make_feature(name)
    case name
    when "base"
      ParkhausBaselBaseFeature.new
    when "test"
      ParkhausBaselTestFeature.new
    else
      ParkhausBaselBaseFeature.new
    end
  end
end
