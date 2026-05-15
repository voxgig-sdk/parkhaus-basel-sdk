<?php
declare(strict_types=1);

// ParkhausBasel SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ParkhausBaselFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ParkhausBaselBaseFeature();
            case "test":
                return new ParkhausBaselTestFeature();
            default:
                return new ParkhausBaselBaseFeature();
        }
    }
}
