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

# Match filter for ParkingData#load (any subset of ParkingData fields).
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
ParkingDataLoadMatch = Struct.new(
  :free,
  :geo_point_2d,
  :published,
  :title,
  keyword_init: true
)

# Match filter for ParkingData#list (any subset of ParkingData fields).
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
ParkingDataListMatch = Struct.new(
  :free,
  :geo_point_2d,
  :published,
  :title,
  keyword_init: true
)

