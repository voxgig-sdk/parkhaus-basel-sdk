<?php
declare(strict_types=1);

// ParkhausBasel SDK utility: feature_add

class ParkhausBaselFeatureAdd
{
    public static function call(ParkhausBaselContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
