import PlaceVO from "./PlaceVO";

/**
 * 오락시설 리스트
 * 
 * PC방,
 * 오락실,
 * 만화카페,
 * 노래방,
 * 영화관,
 * 호프,
 * 이자카야,
 * 칵테일바,
 */
export interface PlayItemList { 
    play1?: PlaceVO[],
    play2?: PlaceVO[],
    play3?: PlaceVO[],
    play4?: PlaceVO[],
    play5?: PlaceVO[],
    play6?: PlaceVO[],
    play7?: PlaceVO[],
    play8?: PlaceVO[],
}