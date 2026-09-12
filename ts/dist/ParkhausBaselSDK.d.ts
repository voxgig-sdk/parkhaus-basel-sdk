import { ParkingDataEntity } from './entity/ParkingDataEntity';
export type * from './ParkhausBaselTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ParkhausBaselEntityBase } from './ParkhausBaselEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ParkhausBaselSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    ParkingData(entopts?: Record<string, any>): ParkingDataEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ParkhausBaselSDK;
    tester(testopts?: any, sdkopts?: any): ParkhausBaselSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ParkhausBaselSDK;
export { stdutil, config, BaseFeature, ParkhausBaselEntityBase, ParkhausBaselSDK, SDK, };
