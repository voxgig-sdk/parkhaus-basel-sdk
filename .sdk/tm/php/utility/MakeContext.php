<?php
declare(strict_types=1);

// ParkhausBasel SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ParkhausBaselMakeContext
{
    public static function call(array $ctxmap, ?ParkhausBaselContext $basectx): ParkhausBaselContext
    {
        return new ParkhausBaselContext($ctxmap, $basectx);
    }
}
