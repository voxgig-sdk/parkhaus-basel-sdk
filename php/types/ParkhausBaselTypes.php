<?php
declare(strict_types=1);

// Typed models for the ParkhausBasel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ParkingData entity data model. */
class ParkingData
{
    public ?int $free = null;
    public ?array $geo_point_2d = null;
    public ?string $published = null;
    public ?string $title = null;
}

/** Match filter for ParkingData#load (any subset of ParkingData fields). */
class ParkingDataLoadMatch
{
    public ?int $free = null;
    public ?array $geo_point_2d = null;
    public ?string $published = null;
    public ?string $title = null;
}

/** Match filter for ParkingData#list (any subset of ParkingData fields). */
class ParkingDataListMatch
{
    public ?int $free = null;
    public ?array $geo_point_2d = null;
    public ?string $published = null;
    public ?string $title = null;
}

