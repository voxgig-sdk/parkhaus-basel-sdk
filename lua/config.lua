-- ParkhausBasel SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ParkhausBasel",
      slug = "parkhaus-basel",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://data.bs.ch/api/explore/v2.1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["parking_data"] = {},
      },
    },
    entity = {
      ["parking_data"] = {
        ["fields"] = {
          {
            ["name"] = "free",
            ["title"] = "Free",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of free parking spaces",
          },
          {
            ["name"] = "geo_point_2d",
            ["title"] = "Geo Point 2d",
            ["type"] = "`$OBJECT`",
            ["short"] = "Geographic coordinates of the parking garage",
          },
          {
            ["name"] = "published",
            ["title"] = "Published",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the data was published",
            ["format"] = "date-time",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["short"] = "Name of the parking garage",
          },
        },
        ["name"] = "parking_data",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/catalog/datasets/100088/records",
                ["segments"] = {
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "datasets",
                  },
                  {
                    ["lit"] = "100088",
                  },
                  {
                    ["lit"] = "records",
                  },
                },
                ["parts"] = {
                  "catalog",
                  "datasets",
                  "100088",
                  "records",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "order_by",
                      ["orig"] = "order_by",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "published DESC",
                    },
                    {
                      ["name"] = "refine_title",
                      ["orig"] = "refine_title",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "select",
                      ["orig"] = "select",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "title,free,published",
                    },
                    {
                      ["name"] = "timezone",
                      ["orig"] = "timezone",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "UTC",
                    },
                    {
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "offset",
                    "order_by",
                    "refine_title",
                    "select",
                    "timezone",
                    "where",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/catalog/datasets/100088/exports/json",
                ["segments"] = {
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "datasets",
                  },
                  {
                    ["lit"] = "100088",
                  },
                  {
                    ["lit"] = "exports",
                  },
                  {
                    ["lit"] = "json",
                  },
                },
                ["parts"] = {
                  "catalog",
                  "datasets",
                  "100088",
                  "exports",
                  "json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "timezone",
                      ["orig"] = "timezone",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "UTC",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "timezone",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/catalog/datasets/100088/exports/csv",
                ["segments"] = {
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "datasets",
                  },
                  {
                    ["lit"] = "100088",
                  },
                  {
                    ["lit"] = "exports",
                  },
                  {
                    ["lit"] = "csv",
                  },
                },
                ["parts"] = {
                  "catalog",
                  "datasets",
                  "100088",
                  "exports",
                  "csv",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "delimiter",
                      ["orig"] = "delimiter",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = ";",
                    },
                    {
                      ["name"] = "timezone",
                      ["orig"] = "timezone",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "UTC",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "delimiter",
                    "timezone",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
