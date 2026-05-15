<?php
declare(strict_types=1);

// ParkhausBasel SDK utility: prepare_body

class ParkhausBaselPrepareBody
{
    public static function call(ParkhausBaselContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
