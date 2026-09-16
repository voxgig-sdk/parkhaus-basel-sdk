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
            ["short"] = "Number of free parking spaces",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "geo_point_2d",
            ["short"] = "Geographic coordinates of the parking garage",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "published",
            ["short"] = "Timestamp when the data was published",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["short"] = "Name of the parking garage",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "parking_data",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "published DESC",
                      ["kind"] = "query",
                      ["name"] = "order_by",
                      ["orig"] = "order_by",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "refine_title",
                      ["orig"] = "refine_title",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "title,free,published",
                      ["kind"] = "query",
                      ["name"] = "select",
                      ["orig"] = "select",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "UTC",
                      ["kind"] = "query",
                      ["name"] = "timezone",
                      ["orig"] = "timezone",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "catalog",
                  "datasets",
                  "100088",
                  "records",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "UTC",
                      ["kind"] = "query",
                      ["name"] = "timezone",
                      ["orig"] = "timezone",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "timezone",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "catalog",
                  "datasets",
                  "100088",
                  "exports",
                  "json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = ";",
                      ["kind"] = "query",
                      ["name"] = "delimiter",
                      ["orig"] = "delimiter",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "UTC",
                      ["kind"] = "query",
                      ["name"] = "timezone",
                      ["orig"] = "timezone",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "delimiter",
                    "timezone",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "catalog",
                  "datasets",
                  "100088",
                  "exports",
                  "csv",
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
