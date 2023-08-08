import React from 'react';
import PlaceVO from '../models/PlaceVO';

const ClusteritemWindow = (placeVO: PlaceVO) => {
    return (
        `<div id="cluster_item" class="cluster_item">
            <div class="cluster_header">
                <h4 class="txt_cut1">장소 정보</h4>
                <a className="filter_popup_close"
                    onClick="closeClusterWindow()"
                ></a>
            </div>
            <h4 class="txt_cut1">${placeVO.place_name}</h4>
            <p class="address">(도로명) ${placeVO.road_address_name}</p>
            <p class="address">(지번) ${placeVO.address_name}</p>
            <p class="address">(연락처) ${placeVO.phone.length > 0 ? placeVO.phone : "없음"}</p>
            <p class="address">분류 : ${placeVO.category_name}</p>
            <a class="url"; id="${placeVO.id}"; onClick="openWinFrame('${placeVO.place_url}')"; ><b>상세정보보기</b></a>
        </div>`
    );
};

export default ClusteritemWindow;