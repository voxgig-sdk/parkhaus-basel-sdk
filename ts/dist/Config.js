"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'ParkhausBasel',
        slug: "parkhaus-basel",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://data.bs.ch/api/explore/v2.1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            parking_data: {},
        }
    };
    entity = {
        "parking_data": {
            "fields": [
                {
                    "name": "free",
                    "title": "Free",
                    "type": "`$INTEGER`",
                    "short": "Number of free parking spaces"
                },
                {
                    "name": "geo_point_2d",
                    "title": "Geo Point 2d",
                    "type": "`$OBJECT`",
                    "short": "Geographic coordinates of the parking garage"
                },
                {
                    "name": "published",
                    "title": "Published",
                    "type": "`$STRING`",
                    "short": "Timestamp when the data was published",
                    "format": "date-time"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "short": "Name of the parking garage"
                }
            ],
            "name": "parking_data",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/catalog/datasets/100088/records",
                            "segments": [
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "datasets"
                                },
                                {
                                    "lit": "100088"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "catalog",
                                "datasets",
                                "100088",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "order_by",
                                        "orig": "order_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "published DESC"
                                    },
                                    {
                                        "name": "refine_title",
                                        "orig": "refine_title",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "select",
                                        "orig": "select",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "title,free,published"
                                    },
                                    {
                                        "name": "timezone",
                                        "orig": "timezone",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "UTC"
                                    },
                                    {
                                        "name": "where",
                                        "orig": "where",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
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
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/catalog/datasets/100088/exports/json",
                            "segments": [
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "datasets"
                                },
                                {
                                    "lit": "100088"
                                },
                                {
                                    "lit": "exports"
                                },
                                {
                                    "lit": "json"
                                }
                            ],
                            "parts": [
                                "catalog",
                                "datasets",
                                "100088",
                                "exports",
                                "json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "timezone",
                                        "orig": "timezone",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "UTC"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "timezone"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/catalog/datasets/100088/exports/csv",
                            "segments": [
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "datasets"
                                },
                                {
                                    "lit": "100088"
                                },
                                {
                                    "lit": "exports"
                                },
                                {
                                    "lit": "csv"
                                }
                            ],
                            "parts": [
                                "catalog",
                                "datasets",
                                "100088",
                                "exports",
                                "csv"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "delimiter",
                                        "orig": "delimiter",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ";"
                                    },
                                    {
                                        "name": "timezone",
                                        "orig": "timezone",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "UTC"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "delimiter",
                                    "timezone"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map