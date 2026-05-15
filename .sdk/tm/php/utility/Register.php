<?php
declare(strict_types=1);

// ParkhausBasel SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ParkhausBaselUtility::setRegistrar(function (ParkhausBaselUtility $u): void {
    $u->clean = [ParkhausBaselClean::class, 'call'];
    $u->done = [ParkhausBaselDone::class, 'call'];
    $u->make_error = [ParkhausBaselMakeError::class, 'call'];
    $u->feature_add = [ParkhausBaselFeatureAdd::class, 'call'];
    $u->feature_hook = [ParkhausBaselFeatureHook::class, 'call'];
    $u->feature_init = [ParkhausBaselFeatureInit::class, 'call'];
    $u->fetcher = [ParkhausBaselFetcher::class, 'call'];
    $u->make_fetch_def = [ParkhausBaselMakeFetchDef::class, 'call'];
    $u->make_context = [ParkhausBaselMakeContext::class, 'call'];
    $u->make_options = [ParkhausBaselMakeOptions::class, 'call'];
    $u->make_request = [ParkhausBaselMakeRequest::class, 'call'];
    $u->make_response = [ParkhausBaselMakeResponse::class, 'call'];
    $u->make_result = [ParkhausBaselMakeResult::class, 'call'];
    $u->make_point = [ParkhausBaselMakePoint::class, 'call'];
    $u->make_spec = [ParkhausBaselMakeSpec::class, 'call'];
    $u->make_url = [ParkhausBaselMakeUrl::class, 'call'];
    $u->param = [ParkhausBaselParam::class, 'call'];
    $u->prepare_auth = [ParkhausBaselPrepareAuth::class, 'call'];
    $u->prepare_body = [ParkhausBaselPrepareBody::class, 'call'];
    $u->prepare_headers = [ParkhausBaselPrepareHeaders::class, 'call'];
    $u->prepare_method = [ParkhausBaselPrepareMethod::class, 'call'];
    $u->prepare_params = [ParkhausBaselPrepareParams::class, 'call'];
    $u->prepare_path = [ParkhausBaselPreparePath::class, 'call'];
    $u->prepare_query = [ParkhausBaselPrepareQuery::class, 'call'];
    $u->result_basic = [ParkhausBaselResultBasic::class, 'call'];
    $u->result_body = [ParkhausBaselResultBody::class, 'call'];
    $u->result_headers = [ParkhausBaselResultHeaders::class, 'call'];
    $u->transform_request = [ParkhausBaselTransformRequest::class, 'call'];
    $u->transform_response = [ParkhausBaselTransformResponse::class, 'call'];
});
