package = "voxgig-sdk-parkhaus-basel"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/parkhaus-basel-sdk.git"
}
description = {
  summary = "ParkhausBasel SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
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
