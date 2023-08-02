import PlaceVO from "./PlaceVO";

/**
 * 음식점 리스트
 * 
 * 한식,
 * 양식,
 * 중식,
 * 일식,
 * 분식,
 * 패스트푸드,
 */
export interface ResItemList { 
    res1?: PlaceVO[],
    res2?: PlaceVO[],
    res3?: PlaceVO[],
    res4?: PlaceVO[],
    res5?: PlaceVO[],
    res6?: PlaceVO[],
}