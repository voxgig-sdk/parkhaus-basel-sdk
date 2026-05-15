<?php
declare(strict_types=1);

// ParkhausBasel SDK exists test

require_once __DIR__ . '/../parkhausbasel_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ParkhausBaselSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
