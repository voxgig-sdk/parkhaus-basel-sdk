import { ParkhausBaselEntityBase } from '../ParkhausBaselEntityBase';
import type { ParkhausBaselSDK } from '../ParkhausBaselSDK';
import type { Control } from '../types';
import type { ParkingData, ParkingDataLoadMatch, ParkingDataListMatch } from '../ParkhausBaselTypes';
declare class ParkingDataEntity extends ParkhausBaselEntityBase<ParkingData> {
    constructor(client: ParkhausBaselSDK, entopts: any);
    make(this: ParkingDataEntity): ParkingDataEntity;
    load(this: any, reqmatch?: ParkingDataLoadMatch, ctrl?: Control): Promise<ParkingDataEntity>;
    list(this: any, reqmatch?: ParkingDataListMatch, ctrl?: Control): Promise<ParkingDataEntity[]>;
}
export { ParkingDataEntity };
