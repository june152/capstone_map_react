import React, { useEffect } from 'react';

/**
 * 클러스터 마커리스트
 * @param cluster
 * @returns 
 */
const ClusterInfoWindow = (cluster: any[], map:any) => {
    const toStringFunc = (cluster: any[]) => {
        return `${cluster.map((marker) => `<li><a onClick="selectClusterItem('${marker.getPosition()}'* '${marker.getTitle()}'* '${map}')"><div class="list_table"><h5 class="title">${marker.getTitle()}</h5></div></a></li>`)}`
    }

    const listToString = toStringFunc(cluster).replaceAll(',', "").replaceAll('*', ',')

    return `<div id="cluster_window" class="cluster_window">
    <div class="cluster_header">
        <h4 class="txt_cut1">장소 리스트</h4>
        <a className="filter_popup_close"
            onClick="closeClusterWindow()"
        ></a>
    </div>
        <ul>
            ${listToString}
        </ul>
    </div>`
};

export default ClusterInfoWindow;