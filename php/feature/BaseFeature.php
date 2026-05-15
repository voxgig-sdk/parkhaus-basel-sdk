<?php
declare(strict_types=1);

// ParkhausBasel SDK base feature

class ParkhausBaselBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ParkhausBaselContext $ctx, array $options): void {}
    public function PostConstruct(ParkhausBaselContext $ctx): void {}
    public function PostConstructEntity(ParkhausBaselContext $ctx): void {}
    public function SetData(ParkhausBaselContext $ctx): void {}
    public function GetData(ParkhausBaselContext $ctx): void {}
    public function GetMatch(ParkhausBaselContext $ctx): void {}
    public function SetMatch(ParkhausBaselContext $ctx): void {}
    public function PrePoint(ParkhausBaselContext $ctx): void {}
    public function PreSpec(ParkhausBaselContext $ctx): void {}
    public function PreRequest(ParkhausBaselContext $ctx): void {}
    public function PreResponse(ParkhausBaselContext $ctx): void {}
    public function PreResult(ParkhausBaselContext $ctx): void {}
    public function PreDone(ParkhausBaselContext $ctx): void {}
    public function PreUnexpected(ParkhausBaselContext $ctx): void {}
}
