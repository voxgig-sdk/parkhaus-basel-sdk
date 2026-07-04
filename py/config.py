# ParkhausBasel SDK configuration


def make_config():
    return {
        "main": {
            "name": "ParkhausBasel",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://data.bs.ch/api/explore/v2.1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "parking_data": {},
            },
        },
        "entity": {
      "parking_data": {
        "fields": [
          {
            "active": True,
            "name": "free",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "geo_point_2d",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "published",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "title",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "parking_data",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": "published DESC",
                      "kind": "query",
                      "name": "order_by",
                      "orig": "order_by",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "refine_title",
                      "orig": "refine_title",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "title,free,published",
                      "kind": "query",
                      "name": "select",
                      "orig": "select",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "UTC",
                      "kind": "query",
                      "name": "timezone",
                      "orig": "timezone",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "where",
                      "orig": "where",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/catalog/datasets/100088/records",
                "parts": [
                  "catalog",
                  "datasets",
                  "100088",
                  "records",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "order_by",
                    "refine_title",
                    "select",
                    "timezone",
                    "where",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "UTC",
                      "kind": "query",
                      "name": "timezone",
                      "orig": "timezone",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/catalog/datasets/100088/exports/json",
                "parts": [
                  "catalog",
                  "datasets",
                  "100088",
                  "exports",
                  "json",
                ],
                "select": {
                  "exist": [
                    "timezone",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": ";",
                      "kind": "query",
                      "name": "delimiter",
                      "orig": "delimiter",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "UTC",
                      "kind": "query",
                      "name": "timezone",
                      "orig": "timezone",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/catalog/datasets/100088/exports/csv",
                "parts": [
                  "catalog",
                  "datasets",
                  "100088",
                  "exports",
                  "csv",
                ],
                "select": {
                  "exist": [
                    "delimiter",
                    "timezone",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
