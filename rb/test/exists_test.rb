# ParkhausBasel SDK exists test

require "minitest/autorun"
require_relative "../ParkhausBasel_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ParkhausBaselSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
