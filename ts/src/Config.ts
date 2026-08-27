
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ParkhausBasel',
        slug: "parkhaus-basel",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://data.bs.ch/api/explore/v2.1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      parking_data: {
      },

    }
  }


  entity = {
    "parking_data": {
      "fields": [
        {
          "name": "free",
          "short": "Number of free parking spaces",
          "type": "`$INTEGER`"
        },
        {
          "name": "geo_point_2d",
          "short": "Geographic coordinates of the parking garage",
          "type": "`$OBJECT`"
        },
        {
          "name": "published",
          "short": "Timestamp when the data was published",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "Name of the parking garage",
          "type": "`$STRING`"
        }
      ],
      "name": "parking_data",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "published DESC",
                    "kind": "query",
                    "name": "order_by",
                    "orig": "order_by",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "refine_title",
                    "orig": "refine_title",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "title,free,published",
                    "kind": "query",
                    "name": "select",
                    "orig": "select",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "UTC",
                    "kind": "query",
                    "name": "timezone",
                    "orig": "timezone",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "where",
                    "orig": "where",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/catalog/datasets/100088/records",
              "parts": [
                "catalog",
                "datasets",
                "100088",
                "records"
              ],
              "select": {
                "exist": [
                  "limit",
                  "offset",
                  "order_by",
                  "refine_title",
                  "select",
                  "timezone",
                  "where"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "UTC",
                    "kind": "query",
                    "name": "timezone",
                    "orig": "timezone",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/catalog/datasets/100088/exports/json",
              "parts": [
                "catalog",
                "datasets",
                "100088",
                "exports",
                "json"
              ],
              "select": {
                "exist": [
                  "timezone"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": ";",
                    "kind": "query",
                    "name": "delimiter",
                    "orig": "delimiter",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "UTC",
                    "kind": "query",
                    "name": "timezone",
                    "orig": "timezone",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/catalog/datasets/100088/exports/csv",
              "parts": [
                "catalog",
                "datasets",
                "100088",
                "exports",
                "csv"
              ],
              "select": {
                "exist": [
                  "delimiter",
                  "timezone"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

