<?php
declare(strict_types=1);

// ParkhausBasel SDK utility: result_body

class ParkhausBaselResultBody
{
    public static function call(ParkhausBaselContext $ctx): ?ParkhausBaselResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
