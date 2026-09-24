<?php
declare(strict_types=1);

// ParkhausBasel SDK configuration

class ParkhausBaselConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ParkhausBasel",
                "slug" => "parkhaus-basel",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://data.bs.ch/api/explore/v2.1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "parking_data" => [],
                ],
            ],
            "entity" => [
        'parking_data' => [
          'fields' => [
            [
              'name' => 'free',
              'title' => 'Free',
              'type' => '`$INTEGER`',
              'short' => 'Number of free parking spaces',
            ],
            [
              'name' => 'geo_point_2d',
              'title' => 'Geo Point 2d',
              'type' => '`$OBJECT`',
              'short' => 'Geographic coordinates of the parking garage',
            ],
            [
              'name' => 'published',
              'title' => 'Published',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the data was published',
              'format' => 'date-time',
            ],
            [
              'name' => 'title',
              'title' => 'Title',
              'type' => '`$STRING`',
              'short' => 'Name of the parking garage',
            ],
          ],
          'name' => 'parking_data',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/catalog/datasets/100088/records',
                  'segments' => [
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'datasets',
                    ],
                    [
                      'lit' => '100088',
                    ],
                    [
                      'lit' => 'records',
                    ],
                  ],
                  'parts' => [
                    'catalog',
                    'datasets',
                    '100088',
                    'records',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 10,
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'order_by',
                        'orig' => 'order_by',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'published DESC',
                      ],
                      [
                        'name' => 'refine_title',
                        'orig' => 'refine_title',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'select',
                        'orig' => 'select',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'title,free,published',
                      ],
                      [
                        'name' => 'timezone',
                        'orig' => 'timezone',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'UTC',
                      ],
                      [
                        'name' => 'where',
                        'orig' => 'where',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                      'order_by',
                      'refine_title',
                      'select',
                      'timezone',
                      'where',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/catalog/datasets/100088/exports/json',
                  'segments' => [
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'datasets',
                    ],
                    [
                      'lit' => '100088',
                    ],
                    [
                      'lit' => 'exports',
                    ],
                    [
                      'lit' => 'json',
                    ],
                  ],
                  'parts' => [
                    'catalog',
                    'datasets',
                    '100088',
                    'exports',
                    'json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'timezone',
                        'orig' => 'timezone',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'UTC',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'timezone',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/catalog/datasets/100088/exports/csv',
                  'segments' => [
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'datasets',
                    ],
                    [
                      'lit' => '100088',
                    ],
                    [
                      'lit' => 'exports',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'catalog',
                    'datasets',
                    '100088',
                    'exports',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'delimiter',
                        'orig' => 'delimiter',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => ';',
                      ],
                      [
                        'name' => 'timezone',
                        'orig' => 'timezone',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'UTC',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'delimiter',
                      'timezone',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ParkhausBaselFeatures::make_feature($name);
    }
}
