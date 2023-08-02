import PlaceVO from "./PlaceVO";

/**
 * 편의시설 리스트
 * 
 * 편의점,
 * 마트,
 * 세탁소,
 * 미용실,
 * 스터디카페,
 * 은행,
 * 병원,
 * 약국,
 * 헬스장
 */
export interface ConItemList { 
    con1?: PlaceVO[],
    con2?: PlaceVO[],
    con3?: PlaceVO[],
    con4?: PlaceVO[],
    con5?: PlaceVO[],
    con6?: PlaceVO[],
    con7?: PlaceVO[],
    con8?: PlaceVO[],
    con9?: PlaceVO[],
}