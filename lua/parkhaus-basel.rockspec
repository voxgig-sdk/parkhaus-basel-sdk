package = "voxgig-sdk-parkhaus-basel"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/parkhaus-basel-sdk.git",
  tag = "lua/v0.0.1",
  dir = "parkhaus-basel-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Parkhaus Basel public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/parkhaus-basel-sdk",
  issues_url = "https://github.com/voxgig-sdk/parkhaus-basel-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "parkhaus-basel" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["parkhaus-basel_sdk"] = "parkhaus-basel_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
