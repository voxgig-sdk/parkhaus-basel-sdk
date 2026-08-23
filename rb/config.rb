# ParkhausBasel SDK configuration

module ParkhausBaselConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ParkhausBasel",
        "slug" => "parkhaus-basel",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://data.bs.ch/api/explore/v2.1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "parking_data" => {},
        },
      },
      "entity" => {
        "parking_data" => {
          "fields" => [
            {
              "name" => "free",
              "short" => "Number of free parking spaces",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "geo_point_2d",
              "short" => "Geographic coordinates of the parking garage",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "published",
              "short" => "Timestamp when the data was published",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "short" => "Name of the parking garage",
              "type" => "`$STRING`",
            },
          ],
          "name" => "parking_data",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "published DESC",
                        "kind" => "query",
                        "name" => "order_by",
                        "orig" => "order_by",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "refine_title",
                        "orig" => "refine_title",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "title,free,published",
                        "kind" => "query",
                        "name" => "select",
                        "orig" => "select",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "UTC",
                        "kind" => "query",
                        "name" => "timezone",
                        "orig" => "timezone",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "where",
                        "orig" => "where",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/catalog/datasets/100088/records",
                  "parts" => [
                    "catalog",
                    "datasets",
                    "100088",
                    "records",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                      "order_by",
                      "refine_title",
                      "select",
                      "timezone",
                      "where",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "UTC",
                        "kind" => "query",
                        "name" => "timezone",
                        "orig" => "timezone",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/catalog/datasets/100088/exports/json",
                  "parts" => [
                    "catalog",
                    "datasets",
                    "100088",
                    "exports",
                    "json",
                  ],
                  "select" => {
                    "exist" => [
                      "timezone",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => ";",
                        "kind" => "query",
                        "name" => "delimiter",
                        "orig" => "delimiter",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "UTC",
                        "kind" => "query",
                        "name" => "timezone",
                        "orig" => "timezone",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/catalog/datasets/100088/exports/csv",
                  "parts" => [
                    "catalog",
                    "datasets",
                    "100088",
                    "exports",
                    "csv",
                  ],
                  "select" => {
                    "exist" => [
                      "delimiter",
                      "timezone",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ParkhausBaselFeatures.make_feature(name)
  end
end
