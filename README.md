# ParkhausBasel SDK

Minute-by-minute occupancy data for public parking garages in Basel, Switzerland

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Parkhaus Basel API

The Parkhaus Basel API exposes the live occupancy of the public parking garages in the City of Basel, published as an open dataset by [Kanton Basel-Stadt](https://data.bs.ch/) on its [data.bs.ch](https://data.bs.ch/) Open Government Data portal. The underlying feed is the city's [Parkleitsystem Basel](https://www.parkleitsystem-basel.ch) (parking guidance system).

The portal is built on the OpenDataSoft Explore platform, so the API follows the standard OpenDataSoft v2.1 conventions (`/catalog/datasets/{dataset_id}/records`, with query, filter, ordering and aggregation parameters).

What you can get from this dataset (`100088`, "Aktuelle Belegung der öffentlichen Parkhäuser Basel"):

- Current number of free parking spaces per public parking garage in Basel.
- Updated approximately every minute.
- A separate historical dataset (id `100014`) is published alongside it for time-series use.

The endpoint supports CORS, so it can be called directly from browser-side code. No authentication is documented for read access on this dataset.

## Try it

**TypeScript**
```bash
npm install parkhaus-basel
```

**Python**
```bash
pip install parkhaus-basel-sdk
```

**PHP**
```bash
composer require voxgig/parkhaus-basel-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/parkhaus-basel-sdk/go
```

**Ruby**
```bash
gem install parkhaus-basel-sdk
```

**Lua**
```bash
luarocks install parkhaus-basel-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ParkhausBaselSDK } from 'parkhaus-basel'

const client = new ParkhausBaselSDK({})

// List all parkingdatas
const parkingdatas = await client.ParkingData().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o parkhaus-basel-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "parkhaus-basel": {
      "command": "/abs/path/to/parkhaus-basel-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **ParkingData** | Live occupancy records for Basel's public parking garages, served as OpenDataSoft records under `/catalog/datasets/100088/records`. | `/catalog/datasets/100088/records` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from parkhausbasel_sdk import ParkhausBaselSDK

client = ParkhausBaselSDK({})

# List all parkingdatas
parkingdatas, err = client.ParkingData(None).list(None, None)

# Load a specific parkingdata
parkingdata, err = client.ParkingData(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'parkhausbasel_sdk.php';

$client = new ParkhausBaselSDK([]);

// List all parkingdatas
[$parkingdatas, $err] = $client->ParkingData(null)->list(null, null);

// Load a specific parkingdata
[$parkingdata, $err] = $client->ParkingData(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/parkhaus-basel-sdk/go"

client := sdk.NewParkhausBaselSDK(map[string]any{})

// List all parkingdatas
parkingdatas, err := client.ParkingData(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "ParkhausBasel_sdk"

client = ParkhausBaselSDK.new({})

# List all parkingdatas
parkingdatas, err = client.ParkingData(nil).list(nil, nil)

# Load a specific parkingdata
parkingdata, err = client.ParkingData(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("parkhaus-basel_sdk")

local client = sdk.new({})

-- List all parkingdatas
local parkingdatas, err = client:ParkingData(nil):list(nil, nil)

-- Load a specific parkingdata
local parkingdata, err = client:ParkingData(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ParkhausBaselSDK.test()
const result = await client.ParkingData().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ParkhausBaselSDK.test(None, None)
result, err = client.ParkingData(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ParkhausBaselSDK::test(null, null);
[$result, $err] = $client->ParkingData(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ParkingData(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ParkhausBaselSDK.test(nil, nil)
result, err = client.ParkingData(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ParkingData(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Parkhaus Basel API

- Upstream: [https://data.bs.ch/explore/dataset/100088/](https://data.bs.ch/explore/dataset/100088/)
- API docs: [https://data.bs.ch/api/explore/v2.1/console](https://data.bs.ch/api/explore/v2.1/console)

- Published by [Kanton Basel-Stadt](https://data.bs.ch/) on its Open Government Data portal.
- Underlying data is sourced from the [Parkleitsystem Basel](https://www.parkleitsystem-basel.ch) parking guidance system.
- Check the dataset information page for the current terms of use before redistribution.

---

Generated from the Parkhaus Basel API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
