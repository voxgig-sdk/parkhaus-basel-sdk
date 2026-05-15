package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewParkingDataEntityFunc func(client *ParkhausBaselSDK, entopts map[string]any) ParkhausBaselEntity

