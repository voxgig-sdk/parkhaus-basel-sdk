-- Typed models for the ParkhausBasel SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ParkingData
---@field free? number
---@field geo_point_2d? table
---@field published? string
---@field title? string

---@class ParkingDataLoadMatch
---@field delimiter? string
---@field timezone? string

---@class ParkingDataListMatch
---@field limit? number
---@field offset? number
---@field order_by? string
---@field refine_title? string
---@field select? string
---@field timezone? string
---@field where? string

local M = {}

return M
