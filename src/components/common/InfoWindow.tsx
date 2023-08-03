import React from 'react';
import PlaceVO from '../models/PlaceVO';

/**
 * 정보창
 * @param place_name 장소명
 * @param road_address_name 도로명주소
 * @param address_name 지번주소
 * @param phone 연락처
 * @param category_name 분류
 * @returns 
 */
const InfoWindow = (
    placeVO : PlaceVO,
) => {
    return `<div class="info_window">
    <h4 class="txt_cut1">${placeVO.place_name}</h4>
    <p class="address">(도로명) ${placeVO.road_address_name}</p>
    <p class="address">(지번) ${placeVO.address_name}</p>
    <p class="address">(연락처) ${placeVO.phone.length > 0 ? placeVO.phone : "없음"}</p>
    <p class="address">분류 : ${placeVO.category_name}</p>
    </div>`
};

export default InfoWindow;