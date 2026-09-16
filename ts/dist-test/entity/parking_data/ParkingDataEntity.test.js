"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ParkingDataEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PARKHAUS_BASEL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PARKHAUS_BASEL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ParkhausBaselSDK.test();
        const ent = testsdk.ParkingData();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PARKHAUS_BASEL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'parking_data.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "free", "req": false, "short": "Number of free parking spaces", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "geo_point_2d", "req": false, "short": "Geographic coordinates of the parking garage", "type": "`$OBJECT`", "index$": 1 }, { "active": true, "format": "date-time", "name": "published", "req": false, "short": "Timestamp when the data was published", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "title", "req": false, "short": "Name of the parking garage", "type": "`$STRING`", "index$": 3 }], "name": "parking_data", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 10, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": "published DESC", "kind": "query", "name": "order_by", "orig": "order_by", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "refine_title", "orig": "refine_title", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": "title,free,published", "kind": "query", "name": "select", "orig": "select", "reqd": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "example": "UTC", "kind": "query", "name": "timezone", "orig": "timezone", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "where", "orig": "where", "reqd": false, "type": "`$STRING`", "index$": 6 }] }, "contract": { "id": "GET /catalog/datasets/100088/records", "json": "{\"operationId\":\"getParkingOccupancy\",\"parameters\":[{\"description\":\"List of fields to include in the response, separated by commas\",\"example\":\"title,free,published\",\"in\":\"query\",\"name\":\"select\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter expression to apply on the dataset\",\"in\":\"query\",\"name\":\"where\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Field(s) to order results by\",\"example\":\"published DESC\",\"in\":\"query\",\"name\":\"order_by\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of records to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of records to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Filter by parking garage title/name\",\"in\":\"query\",\"name\":\"refine.title\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Timezone for datetime fields\",\"in\":\"query\",\"name\":\"timezone\",\"required\":false,\"schema\":{\"default\":\"UTC\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"results\":[{\"free\":45,\"geo_point_2d\":{\"lat\":47.553416,\"lon\":7.588576},\"published\":\"2024-01-15T14:30:00+01:00\",\"title\":\"Parkhaus Elisabethen\"},{\"free\":120,\"geo_point_2d\":{\"lat\":47.558931,\"lon\":7.589234},\"published\":\"2024-01-15T14:30:00+01:00\",\"title\":\"ParkhausCity\"}],\"total_count\":15},\"schema\":{\"properties\":{\"results\":{\"items\":{\"properties\":{\"free\":{\"description\":\"Number of free parking spaces\",\"type\":\"integer\"},\"geo_point_2d\":{\"description\":\"Geographic coordinates of the parking garage\",\"properties\":{\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"published\":{\"description\":\"Timestamp when the data was published\",\"format\":\"date-time\",\"type\":\"string\"},\"title\":{\"description\":\"Name of the parking garage\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total_count\":{\"description\":\"Total number of records matching the query\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with parking occupancy data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid query parameters\"},\"404\":{\"description\":\"Dataset not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/catalog/datasets/100088/records", "segments": [{ "lit": "catalog" }, { "lit": "datasets" }, { "lit": "100088" }, { "lit": "records" }], "select": { "exist": ["limit", "offset", "order_by", "refine_title", "select", "timezone", "where"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": "UTC", "kind": "query", "name": "timezone", "orig": "timezone", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /catalog/datasets/100088/exports/json", "json": "{\"operationId\":\"exportParkingDataJSON\",\"parameters\":[{\"description\":\"Timezone for datetime fields\",\"in\":\"query\",\"name\":\"timezone\",\"required\":false,\"schema\":{\"default\":\"UTC\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"free\":{\"type\":\"integer\"},\"published\":{\"format\":\"date-time\",\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Complete dataset exported as JSON\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/catalog/datasets/100088/exports/json", "segments": [{ "lit": "catalog" }, { "lit": "datasets" }, { "lit": "100088" }, { "lit": "exports" }, { "lit": "json" }], "select": { "exist": ["timezone"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": ";", "kind": "query", "name": "delimiter", "orig": "delimiter", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "UTC", "kind": "query", "name": "timezone", "orig": "timezone", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /catalog/datasets/100088/exports/csv", "json": "{\"operationId\":\"exportParkingDataCSV\",\"parameters\":[{\"description\":\"CSV delimiter character\",\"in\":\"query\",\"name\":\"delimiter\",\"required\":false,\"schema\":{\"default\":\";\",\"enum\":[\";\",\",\",\"\\t\"],\"type\":\"string\"}},{\"description\":\"Timezone for datetime fields\",\"in\":\"query\",\"name\":\"timezone\",\"required\":false,\"schema\":{\"default\":\"UTC\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/csv\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Complete dataset exported as CSV\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/catalog/datasets/100088/exports/csv", "segments": [{ "lit": "catalog" }, { "lit": "datasets" }, { "lit": "100088" }, { "lit": "exports" }, { "lit": "csv" }], "select": { "exist": ["delimiter", "timezone"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "parking_data", "name__orig": "parking_data", "Name": "ParkingData", "name_": "parking_data", "name-": "parking-data", "NAME": "PARKING_DATA", "index$": 0 }, { "active": true, "entity": "parking_data", "key$": "BasicParkingDataFlow", "kind": "basic", "name": "BasicParkingDataFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "parking_data_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "parking_data_ref01", "srcdatavar": "parking_data_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-parking_data_ref01" } }], "index$": 1 }] }, 'ParkingData');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let parking_data_ref01_data = Object.values(setup.data.existing.parking_data)[0];
        // LIST
        const parking_data_ref01_ent = client.ParkingData();
        const parking_data_ref01_match = {};
        const parking_data_ref01_list = (await parking_data_ref01_ent.list(parking_data_ref01_match)).map((e) => e.data());
        // LOAD
        const parking_data_ref01_match_dt0 = {};
        const parking_data_ref01_data_dt0 = (await parking_data_ref01_ent.load(parking_data_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != parking_data_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/parking_data/ParkingDataTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ParkhausBaselSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['parking_data01', 'parking_data02', 'parking_data03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PARKHAUS_BASEL_TEST_PARKING_DATA_ENTID': idmap,
        'PARKHAUS_BASEL_TEST_LIVE': 'FALSE',
        'PARKHAUS_BASEL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PARKHAUS_BASEL_TEST_PARKING_DATA_ENTID'];
    const live = 'TRUE' === env.PARKHAUS_BASEL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PARKHAUS_BASEL_TEST_PARKING_DATA_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ParkhausBaselSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PARKHAUS_BASEL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ParkingDataEntity.test.js.map