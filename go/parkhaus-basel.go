package voxgigparkhausbaselsdk

import (
	"github.com/voxgig-sdk/parkhaus-basel-sdk/core"
	"github.com/voxgig-sdk/parkhaus-basel-sdk/entity"
	"github.com/voxgig-sdk/parkhaus-basel-sdk/feature"
	_ "github.com/voxgig-sdk/parkhaus-basel-sdk/utility"
)

// Type aliases preserve external API.
type ParkhausBaselSDK = core.ParkhausBaselSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ParkhausBaselEntity = core.ParkhausBaselEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ParkhausBaselError = core.ParkhausBaselError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewParkingDataEntityFunc = func(client *core.ParkhausBaselSDK, entopts map[string]any) core.ParkhausBaselEntity {
		return entity.NewParkingDataEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewParkhausBaselSDK = core.NewParkhausBaselSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
