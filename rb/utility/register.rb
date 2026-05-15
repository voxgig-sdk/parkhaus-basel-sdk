# ParkhausBasel SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ParkhausBaselUtility.registrar = ->(u) {
  u.clean = ParkhausBaselUtilities::Clean
  u.done = ParkhausBaselUtilities::Done
  u.make_error = ParkhausBaselUtilities::MakeError
  u.feature_add = ParkhausBaselUtilities::FeatureAdd
  u.feature_hook = ParkhausBaselUtilities::FeatureHook
  u.feature_init = ParkhausBaselUtilities::FeatureInit
  u.fetcher = ParkhausBaselUtilities::Fetcher
  u.make_fetch_def = ParkhausBaselUtilities::MakeFetchDef
  u.make_context = ParkhausBaselUtilities::MakeContext
  u.make_options = ParkhausBaselUtilities::MakeOptions
  u.make_request = ParkhausBaselUtilities::MakeRequest
  u.make_response = ParkhausBaselUtilities::MakeResponse
  u.make_result = ParkhausBaselUtilities::MakeResult
  u.make_point = ParkhausBaselUtilities::MakePoint
  u.make_spec = ParkhausBaselUtilities::MakeSpec
  u.make_url = ParkhausBaselUtilities::MakeUrl
  u.param = ParkhausBaselUtilities::Param
  u.prepare_auth = ParkhausBaselUtilities::PrepareAuth
  u.prepare_body = ParkhausBaselUtilities::PrepareBody
  u.prepare_headers = ParkhausBaselUtilities::PrepareHeaders
  u.prepare_method = ParkhausBaselUtilities::PrepareMethod
  u.prepare_params = ParkhausBaselUtilities::PrepareParams
  u.prepare_path = ParkhausBaselUtilities::PreparePath
  u.prepare_query = ParkhausBaselUtilities::PrepareQuery
  u.result_basic = ParkhausBaselUtilities::ResultBasic
  u.result_body = ParkhausBaselUtilities::ResultBody
  u.result_headers = ParkhausBaselUtilities::ResultHeaders
  u.transform_request = ParkhausBaselUtilities::TransformRequest
  u.transform_response = ParkhausBaselUtilities::TransformResponse
}
