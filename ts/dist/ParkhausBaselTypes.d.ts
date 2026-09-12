export interface ParkingData {
    free?: number;
    geo_point_2d?: Record<string, any>;
    published?: string;
    title?: string;
}
export interface ParkingDataLoadMatch {
    delimiter?: string;
    timezone?: string;
}
export interface ParkingDataListMatch {
    limit?: number;
    offset?: number;
    order_by?: string;
    refine_title?: string;
    select?: string;
    timezone?: string;
    where?: string;
}
