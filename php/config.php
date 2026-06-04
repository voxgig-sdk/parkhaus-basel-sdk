<?php
declare(strict_types=1);

// ParkhausBasel SDK configuration

class ParkhausBaselConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ParkhausBasel",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'geo_point_2d',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'published',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'title',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
          ],
          'name' => 'parking_data',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 'published DESC',
                        'kind' => 'query',
                        'name' => 'order_by',
                        'orig' => 'order_by',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'refine_title',
                        'orig' => 'refine_title',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'title,free,published',
                        'kind' => 'query',
                        'name' => 'select',
                        'orig' => 'select',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'UTC',
                        'kind' => 'query',
                        'name' => 'timezone',
                        'orig' => 'timezone',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'where',
                        'orig' => 'where',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/catalog/datasets/100088/records',
                  'parts' => [
                    'catalog',
                    'datasets',
                    '100088',
                    'records',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'UTC',
                        'kind' => 'query',
                        'name' => 'timezone',
                        'orig' => 'timezone',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/catalog/datasets/100088/exports/json',
                  'parts' => [
                    'catalog',
                    'datasets',
                    '100088',
                    'exports',
                    'json',
                  ],
                  'select' => [
                    'exist' => [
                      'timezone',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => ';',
                        'kind' => 'query',
                        'name' => 'delimiter',
                        'orig' => 'delimiter',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'UTC',
                        'kind' => 'query',
                        'name' => 'timezone',
                        'orig' => 'timezone',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/catalog/datasets/100088/exports/csv',
                  'parts' => [
                    'catalog',
                    'datasets',
                    '100088',
                    'exports',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'delimiter',
                      'timezone',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
