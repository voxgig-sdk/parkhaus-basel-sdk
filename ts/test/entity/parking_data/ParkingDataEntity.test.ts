

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ParkhausBaselSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ParkingDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PARKHAUS_BASEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('PARKHAUS_BASEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ParkhausBaselSDK.test()
    const ent = testsdk.ParkingData()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PARKHAUS_BASEL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'parking_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"free":{"a":true,"h":"Free","n":"free","r":false,"sh":"Number of free parking spaces","t":"`$INTEGER`","key$":"free","index$":0},"geo_point_2d":{"a":true,"h":"Geo Point 2d","n":"geo_point_2d","r":false,"sh":"Geographic coordinates of the parking garage","t":"`$OBJECT`","key$":"geo_point_2d","index$":1},"published":{"a":true,"fo":"date-time","h":"Published","n":"published","r":false,"sh":"Timestamp when the data was published","t":"`$STRING`","key$":"published","index$":2},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Name of the parking garage","t":"`$STRING`","key$":"title","index$":3}},"name":"parking_data","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /catalog/datasets/100088/records","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"published DESC","k":"query","n":"order_by","or":"order_by","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"refine_title","or":"refine_title","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"title,free,published","k":"query","n":"select","or":"select","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"UTC","k":"query","n":"timezone","or":"timezone","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"where","or":"where","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/catalog/datasets/100088/records","q":{"exist":["limit","offset","order_by","refine_title","select","timezone","where"]},"r":{},"s":[{"lit":"catalog"},{"lit":"datasets"},{"lit":"100088"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"a":true,"co":{"id":"GET /catalog/datasets/100088/exports/json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"UTC","k":"query","n":"timezone","or":"timezone","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/catalog/datasets/100088/exports/json","q":{"exist":["timezone"]},"r":{},"s":[{"lit":"catalog"},{"lit":"datasets"},{"lit":"100088"},{"lit":"exports"},{"lit":"json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /catalog/datasets/100088/exports/csv","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":";","k":"query","n":"delimiter","or":"delimiter","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"UTC","k":"query","n":"timezone","or":"timezone","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/catalog/datasets/100088/exports/csv","q":{"exist":["delimiter","timezone"]},"r":{},"s":[{"lit":"catalog"},{"lit":"datasets"},{"lit":"100088"},{"lit":"exports"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"parking_data","name__orig":"parking_data","Name":"ParkingData","name_":"parking_data","name-":"parking-data","NAME":"PARKING_DATA","index$":0}, {"active":true,"entity":"parking_data","key$":"BasicParkingDataFlow","kind":"basic","name":"BasicParkingDataFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"parking_data_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"parking_data_ref01","srcdatavar":"parking_data_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-parking_data_ref01"}}],"index$":1}]}, 'ParkingData', {"GET /catalog/datasets/100088/records":{"protocol":"http","operationId":"getParkingOccupancy","responses":{"200":{"description":"Successful response with parking occupancy data","content":{"application/json":{"schema":{"type":"object","properties":{"total_count":{"description":"Total number of records matching the query","key$":"total_count","type":"integer"},"results":{"items":{"properties":{"free":{"description":"Number of free parking spaces","type":"integer","key$":"free"},"geo_point_2d":{"description":"Geographic coordinates of the parking garage","properties":{"lat":{"format":"double","type":"number"},"lon":{"format":"double","type":"number"}},"type":"object","key$":"geo_point_2d"},"published":{"description":"Timestamp when the data was published","format":"date-time","type":"string","key$":"published"},"title":{"description":"Name of the parking garage","type":"string","key$":"title"}},"type":"object","index$":0},"key$":"results","type":"array"}}},"example":{"total_count":15,"results":[{"title":"Parkhaus Elisabethen","free":45,"published":"2024-01-15T14:30:00+01:00","geo_point_2d":{"lon":7.588576,"lat":47.553416}},{"title":"ParkhausCity","free":120,"published":"2024-01-15T14:30:00+01:00","geo_point_2d":{"lon":7.589234,"lat":47.558931}}]}}}},"400":{"description":"Bad request - Invalid query parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}},"404":{"description":"Dataset not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"select","in":"query","description":"List of fields to include in the response, separated by commas","required":false,"schema":{"type":"string"},"example":"title,free,published","index$":0},{"name":"where","in":"query","description":"Filter expression to apply on the dataset","required":false,"schema":{"type":"string"},"index$":1},{"name":"order_by","in":"query","description":"Field(s) to order results by","required":false,"schema":{"type":"string"},"example":"published DESC","index$":2},{"name":"limit","in":"query","description":"Maximum number of records to return","required":false,"schema":{"type":"integer","default":10,"minimum":1,"maximum":100},"index$":3},{"name":"offset","in":"query","description":"Number of records to skip for pagination","required":false,"schema":{"type":"integer","default":0,"minimum":0},"index$":4},{"name":"refine.title","in":"query","description":"Filter by parking garage title/name","required":false,"schema":{"type":"string"},"index$":5},{"name":"timezone","in":"query","description":"Timezone for datetime fields","required":false,"schema":{"type":"string","default":"UTC"},"index$":6}],"securitySource":"unspecified"},"GET /catalog/datasets/100088/exports/json":{"protocol":"http","operationId":"exportParkingDataJSON","responses":{"200":{"description":"Complete dataset exported as JSON","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"title":{"type":"string","key$":"title"},"free":{"type":"integer","key$":"free"},"published":{"type":"string","format":"date-time","key$":"published"}},"index$":0}}}}}},"parameters":[{"name":"timezone","in":"query","description":"Timezone for datetime fields","required":false,"schema":{"type":"string","default":"UTC"},"index$":0}],"securitySource":"unspecified"},"GET /catalog/datasets/100088/exports/csv":{"protocol":"http","operationId":"exportParkingDataCSV","responses":{"200":{"description":"Complete dataset exported as CSV","content":{"text/csv":{"schema":{"type":"string"}}}}},"parameters":[{"name":"delimiter","in":"query","description":"CSV delimiter character","required":false,"schema":{"type":"string","default":";","enum":[";",",","\t"]},"index$":0},{"name":"timezone","in":"query","description":"Timezone for datetime fields","required":false,"schema":{"type":"string","default":"UTC"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let parking_data_ref01_data = Object.values(setup.data.existing.parking_data)[0] as any

    // LIST
    const parking_data_ref01_ent = client.ParkingData()
    const parking_data_ref01_match: any = {}

    const parking_data_ref01_list = (await parking_data_ref01_ent.list(parking_data_ref01_match)).map((e: any) => e.data())


    // LOAD
    const parking_data_ref01_match_dt0: any = {}
    const parking_data_ref01_data_dt0 = (await parking_data_ref01_ent.load(parking_data_ref01_match_dt0)).data()
    assert(null != parking_data_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/parking_data/ParkingDataTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ParkhausBaselSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['parking_data01','parking_data02','parking_data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PARKHAUS_BASEL_TEST_PARKING_DATA_ENTID': idmap,
    'PARKHAUS_BASEL_TEST_LIVE': 'FALSE',
    'PARKHAUS_BASEL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PARKHAUS_BASEL_TEST_PARKING_DATA_ENTID']

  const live = 'TRUE' === env.PARKHAUS_BASEL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PARKHAUS_BASEL_TEST_PARKING_DATA_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ParkhausBaselSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
