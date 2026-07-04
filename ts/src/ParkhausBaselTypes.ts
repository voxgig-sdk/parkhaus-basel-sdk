// Typed models for the ParkhausBasel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ParkingData {
  free?: number
  geo_point_2d?: Record<string, any>
  published?: string
  title?: string
}

export type ParkingDataLoadMatch = Partial<ParkingData>

export type ParkingDataListMatch = Partial<ParkingData>

