# frozen_string_literal: true

# Typed models for the ParkhausBasel SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ParkingData entity data model.
#
# @!attribute [rw] free
#   @return [Integer, nil]
#
# @!attribute [rw] geo_point_2d
#   @return [Hash, nil]
#
# @!attribute [rw] published
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
ParkingData = Struct.new(
  :free,
  :geo_point_2d,
  :published,
  :title,
  keyword_init: true
)

# Request payload for ParkingData#load.
#
# @!attribute [rw] delimiter
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
ParkingDataLoadMatch = Struct.new(
  :delimiter,
  :timezone,
  keyword_init: true
)

# Request payload for ParkingData#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order_by
#   @return [String, nil]
#
# @!attribute [rw] refine_title
#   @return [String, nil]
#
# @!attribute [rw] select
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] where
#   @return [String, nil]
ParkingDataListMatch = Struct.new(
  :limit,
  :offset,
  :order_by,
  :refine_title,
  :select,
  :timezone,
  :where,
  keyword_init: true
)

