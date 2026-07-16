# ParkingData entity test

require "minitest/autorun"
require "json"
require_relative "../ParkhausBasel_sdk"
require_relative "runner"

class ParkingDataEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ParkhausBaselSDK.test(nil, nil)
    ent = testsdk.ParkingData(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "parking_data" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ParkhausBaselSDK.test(seed, nil)
    seen = base.ParkingData(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ParkhausBaselConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ParkhausBaselSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.ParkingData(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = parking_data_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "parking_data." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PARKHAUSBASEL_TEST_PARKING_DATA_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    parking_data_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.parking_data")))
    parking_data_ref01_data = nil
    if parking_data_ref01_data_raw.length > 0
      parking_data_ref01_data = Helpers.to_map(parking_data_ref01_data_raw[0][1])
    end

    # LIST
    parking_data_ref01_ent = client.ParkingData(nil)
    parking_data_ref01_match = {}

    parking_data_ref01_list_result = parking_data_ref01_ent.list(parking_data_ref01_match, nil)
    assert parking_data_ref01_list_result.is_a?(Array)

    # LOAD
    parking_data_ref01_match_dt0 = {}
    parking_data_ref01_data_dt0_loaded = parking_data_ref01_ent.load(parking_data_ref01_match_dt0, nil)
    assert !parking_data_ref01_data_dt0_loaded.nil?

  end
end

def parking_data_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "parking_data", "ParkingDataTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ParkhausBaselSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["parking_data01", "parking_data02", "parking_data03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["PARKHAUSBASEL_TEST_PARKING_DATA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PARKHAUSBASEL_TEST_PARKING_DATA_ENTID" => idmap,
    "PARKHAUSBASEL_TEST_LIVE" => "FALSE",
    "PARKHAUSBASEL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PARKHAUSBASEL_TEST_PARKING_DATA_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PARKHAUSBASEL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = ParkhausBaselSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PARKHAUSBASEL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PARKHAUSBASEL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
