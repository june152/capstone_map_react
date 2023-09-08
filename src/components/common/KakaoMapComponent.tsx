import React, { useEffect, useState } from 'react';
import FindPlace from '../../utils/FindPlace';
import { ConItemList } from '../models/ConItemList';
import { ResItemList } from '../models/ResItemList';
import { PlayItemList } from '../models/PlayItemList';
import ConMarker from '../../assets/mk_10.png'
import ResMarker from '../../assets/mk_1.png'
import PlayMarker from '../../assets/mk_6.png'
import SearchMarker from '../../assets/mk_13.png'
import InfoWindow from './InfoWindow';
import { MarkerItemSet } from '../../App';
import WinFrameDialog from '../BottomPanelComponent/WinFrameDialog';
import ClusterInfoWindow from './ClusterInfoWindow';

interface KakaoMapComponentProps {
    conItemList?: ConItemList,
    resItemList?: ResItemList,
    playItemList?: PlayItemList,
    handleConItemList: Function,
    handleResItemList: Function,
    handlePlayItemList: Function,
    handleSearchResult: Function,
    conMarkerSetList?: MarkerItemSet[],
    resMarkerSetList?: MarkerItemSet[],
    playMarkerSetList?: MarkerItemSet[],
    searchMarkerSetList?: MarkerItemSet,
    handelConLoad: Function,
    handelResLoad: Function,
    handelPlayLoad: Function,
    handelSearchLoad: Function,
    conListItem: boolean[],
    resListItem: boolean[],
    playListItem: boolean[],
    searchKeyword: string,
    searchRange: number,
    clusterItemState: any,
    modalVisible: boolean,
}

const KakaoMapComponent = ({
    conItemList,
    resItemList,
    playItemList,
    handleConItemList,
    handleResItemList,
    handlePlayItemList,
    handleSearchResult,
    conMarkerSetList,
    resMarkerSetList,
    playMarkerSetList,
    searchMarkerSetList,
    handelConLoad,
    handelResLoad,
    handelPlayLoad,
    handelSearchLoad,
    conListItem,
    resListItem,
    playListItem,
    searchKeyword,
    searchRange,
    clusterItemState,
    modalVisible,
}: KakaoMapComponentProps) => {
    //Map
    const [mapState, setMapState] = useState<any>()
    //현재 내 위치
    const [myLatLng, setMyLatLng] = useState()
    //클릭한 위치
    const [clickLatLng, setClickLatLng] = useState()
    const [lat, setLat] = useState<number>()
    const [lng, setLng] = useState<number>()
    //현재 map level
    const [cLevel, setCLevel] = useState<number>()
    //클릭위치 끝 -> 현재 중심
    const [cLat, setCLat] = useState<number>()
    const [cLng, setCLng] = useState<number>()
    
    //맵 베이스 생성
    useEffect(() => {
        if (!modalVisible) {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(cLat ?? 35.17690999613079, cLng ?? 126.90610797027583), // 지도의 중심좌표
                level: cLevel ?? 4 // 지도의 확대 레벨
            };
            const map = new window.kakao.maps.Map(container, options);
            //최초 맵 생성
            setMapState(map)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        // 현재 위치 좌표 생성
                        console.log("현재위치 좌표", latitude, longitude);
                        const currentLatLng = new window.kakao.maps.LatLng(
                            latitude,
                            longitude
                        );
                        if (!cLat) {
                            setCLat(currentLatLng.getLat())
                            setCLng(currentLatLng.getLng()) 
                        }
                        
                        setMyLatLng(currentLatLng);
                        if (!cLat) {
                            map.setCenter(currentLatLng)
                        }
                    },
                    (error) => {
                        console.error("Error retrieving location : ", error);
                    }
                )
            } else {
                console.error("Geolocation is not supported.");
            }

            let clusterStyles = [
                {
                    width: '30px',
                    height: '30px',
                    background: 'rgba(255, 0, 0, 0.5)',
                    borderRadius: '50%',
                    color: '#fff',
                    textAlign: 'center',
                    lineHeight: '30px'
                }
            ];

            const clusterer = new window.kakao.maps.MarkerClusterer({
                map: map,
                averageCenter: true,
                minLevel: 1,
                disableClickZoom: true,
                gridSize: 15,
                styles: clusterStyles,
            })

            if (conMarkerSetList && conMarkerSetList.length > 0) {
                conMarkerSetList.map((conMarkerList) => {
                    if (conMarkerList && conMarkerList.markerList) {
                        if (conMarkerList.markerList.length > 0) {
                            conMarkerList.markerList.map((conMarker, idx) => {
                                const infoWindow = new window.kakao.maps.InfoWindow({
                                    content: InfoWindow(conMarkerList.itemList[idx])
                                })

                                let imageSize = new window.kakao.maps.Size(20,24)
                                let markerImg = new window.kakao.maps.MarkerImage(ConMarker, imageSize)
                                conMarker.setImage(markerImg)
                                conMarker.setTitle(conMarkerList.itemList[idx].place_name)
                                conMarker.setMap(map)
                                window.kakao.maps.event.addListener(conMarker, "click", () => {
                                    if(infoWindow.getMap()) {
                                        infoWindow.close()
                                    } else {
                                        infoWindow.open(map, conMarker)
                                        let info_window = document.querySelectorAll('.info_window')
                                        info_window.forEach((e:any) => {
                                            e.parentElement.parentElement.style.border = "10px";
                                            e.parentElement.parentElement.style.background = "unset";
                                        })
                                    }
                                })
                            })
                            clusterer.addMarkers(conMarkerList.markerList)
                        }
                    }
                })
            }

            if (resMarkerSetList && resMarkerSetList.length > 0) {
                resMarkerSetList.map((resMarkerList) => {
                    if (resMarkerList && resMarkerList.markerList) {
                        if (resMarkerList.markerList.length > 0) {
                            resMarkerList.markerList.map((resMarker, idx) => {
                                const infoWindow = new window.kakao.maps.InfoWindow({
                                    content: InfoWindow(resMarkerList.itemList[idx])
                                })

                                let imageSize = new window.kakao.maps.Size(20,24)
                                let markerImg = new window.kakao.maps.MarkerImage(ResMarker, imageSize)
                                resMarker.setImage(markerImg)
                                resMarker.setTitle(resMarkerList.itemList[idx].place_name)
                                resMarker.setMap(map)
                                window.kakao.maps.event.addListener(resMarker, "click", () => {
                                    if(infoWindow.getMap()) {
                                        infoWindow.close()
                                    } else {
                                        infoWindow.open(map, resMarker)
                                        let info_window = document.querySelectorAll('.info_window')
                                        info_window.forEach((e:any) => {
                                            e.parentElement.parentElement.style.border = "10px";
                                            e.parentElement.parentElement.style.background = "unset";
                                        })
                                    }
                                })
                            })
                            clusterer.addMarkers(resMarkerList.markerList)
                        }
                    }
                })
            }

            if (playMarkerSetList && playMarkerSetList.length > 0) {
                playMarkerSetList.map((playMarkerList) => {
                    if (playMarkerList && playMarkerList.markerList) {
                        if (playMarkerList.markerList.length > 0) {
                            playMarkerList.markerList.map((playMarker, idx) => {
                                const infoWindow = new window.kakao.maps.InfoWindow({
                                    content: InfoWindow(playMarkerList.itemList[idx])
                                })

                                let imageSize = new window.kakao.maps.Size(20,24)
                                let markerImg = new window.kakao.maps.MarkerImage(PlayMarker, imageSize)
                                playMarker.setImage(markerImg)
                                playMarker.setTitle(playMarkerList.itemList[idx].place_name)
                                playMarker.setMap(map)
                                window.kakao.maps.event.addListener(playMarker, "click", () => {
                                    if(infoWindow.getMap()) {
                                        infoWindow.close()
                                    } else {
                                        infoWindow.open(map, playMarker)
                                        let info_window = document.querySelectorAll('.info_window')
                                        info_window.forEach((e:any) => {
                                            e.parentElement.parentElement.style.border = "10px";
                                            e.parentElement.parentElement.style.background = "unset";
                                        })
                                    }
                                })
                            })
                            clusterer.addMarkers(playMarkerList.markerList)
                        }
                    }
                })
            }

            if (searchMarkerSetList) {
                if (searchMarkerSetList.markerList) {
                    if (searchMarkerSetList.markerList.length > 0) {
                        searchMarkerSetList.markerList.map((search, idx) => {
                            const infoWindow = new window.kakao.maps.InfoWindow({
                                    content: InfoWindow(searchMarkerSetList.itemList[idx])
                            })
                            
                            let imageSize = new window.kakao.maps.Size(20,24)
                            let markerImg = new window.kakao.maps.MarkerImage(SearchMarker, imageSize)

                            search.setImage(markerImg)
                            search.setMap(map)

                            window.kakao.maps.event.addListener(search, "click", () => {
                                if(infoWindow.getMap()) {
                                    infoWindow.close()
                                } else {
                                    infoWindow.open(map, search)
                                    let info_window = document.querySelectorAll('.info_window')
                                    info_window.forEach((e:any) => {
                                        e.parentElement.parentElement.style.border = "10px";
                                        e.parentElement.parentElement.style.background = "unset";
                                    })
                                }
                            })
                        })
                        clusterer.addMarkers(searchMarkerSetList.markerList)
                    }
                }
            }

            // 지도 클릭 이벤트 핸들러 등록
            window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
                setCLevel(map.getLevel())
                const clickedLatLng = mouseEvent.latLng;
                setClickLatLng(clickedLatLng)
                setLat(clickedLatLng.getLat());
                setLng(clickedLatLng.getLng());         
                // console.log("clickedLatLng  :: ", clickedLatLng)
                
                ConArrSetting(clickedLatLng).then((res) => {
                    // console.log("ConArrSetting : ", res)
                    handleConItemList(res)
                    handelConLoad(false)
                })
                ResArrSetting(clickedLatLng).then((res) => {
                    // console.log("ResArrSetting : ", res)
                    handleResItemList(res)
                    handelResLoad(false)
                })
                PlayArrSetting(clickedLatLng).then((res) => {
                    // console.log("PlayArrSetting : ", res)
                    handlePlayItemList(res)
                    handelPlayLoad(false)
                })
                if (searchKeyword.length > 0) {
                    SearchArrSetting(clickedLatLng).then((res) => {
                        // console.log("키워드 검색 결과 : ", res)
                        handleSearchResult(res)
                        handelSearchLoad(false)
                    })
                }
            });

            //드래그 후 중심좌표 변경
            window.kakao.maps.event.addListener(map, "dragend", () => {
                setCLevel(map.getLevel())
                const center = map.getCenter()
                setCLat(center.getLat())
                setCLng(center.getLng()) 
            })

            //스크롤 이벤트
            window.kakao.maps.event.addListener(map, "zoom_changed", () => {
                setCLevel(map.getLevel())
                const center = map.getCenter()
                setCLat(center.getLat())
                setCLng(center.getLng()) 
                window.handleClusterWindowClose()
            })

            //클러스터 이벤트 등록
            window.kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster:any) => {
                console.log("cluster.getMarkers() : ", cluster.getMarkers())
                let test = cluster.getMarkers()
                console.log(test[0])
                const clusterWindow = new window.kakao.maps.InfoWindow({
                    content: ClusterInfoWindow(cluster.getMarkers(), map),
                    position: cluster.getCenter(),
                })
                let winExist = document.getElementById("cluster_window")
                if (winExist) {
                    winExist.remove()
                }
                if(clusterWindow.getMap()) {
                    clusterWindow.close()
                } else {
                    clusterWindow.setMap(map)
                    // clusterWindow.open(map, cluster)
                    let cluster_window = document.querySelectorAll('.cluster_window')
                    cluster_window.forEach((e: any) => {
                        e.parentNode.parentNode.id = "top_dummy_tag"
                        e.parentNode.id = "mid_dummy_tag"
                        e.parentElement.parentElement.style.border = "10px";
                        e.parentElement.previousElementSibling.remove()
                        e.parentElement.parentElement.style.background = "unset";
                    })
                }
                // clusterWindow.setMap(map)
            })
        }
        
        
    }, [conMarkerSetList, resMarkerSetList, playMarkerSetList, searchMarkerSetList, conListItem, resListItem, playListItem, searchKeyword, modalVisible])

    useEffect(() => {
        if (clusterItemState !== null) {
            window.handleClusterWindowClose()
            clusterItemState.setMap(mapState)
            let cluster_item = document.querySelectorAll('.cluster_item')
            cluster_item.forEach((e: any) => {
                e.parentNode.parentNode.id = "top_dummy_tag"
                e.parentNode.id = "mid_dummy_tag"
                e.parentElement.parentElement.style.border = "10px";
                e.parentElement.previousElementSibling.remove()
                e.parentElement.parentElement.style.background = "unset";
            })
        }
    }, [clusterItemState])

    const ConArrSetting = async (latlng: any) => {
        handelConLoad(true)
        let conResp: ConItemList = {
            con1: conListItem[0] ? await FindPlace.findPlace(latlng, '편의점', 250) : undefined,
            con2: conListItem[1] ? await FindPlace.findPlace(latlng, '마트', 250) : undefined,
            con3: conListItem[2] ? await FindPlace.findPlace(latlng, '세탁소', 250) : undefined,
            con4: conListItem[3] ? await FindPlace.findPlace(latlng, '미용실', 250) : undefined,
            con5: conListItem[4] ? await FindPlace.findPlace(latlng, '스터디카페', 250) : undefined,
            con6: conListItem[5] ? await FindPlace.findPlace(latlng, '은행', 500) : undefined,
            con7: conListItem[6] ? await FindPlace.findPlace(latlng, '병원', 1000) : undefined,
            con8: conListItem[7] ? await FindPlace.findPlace(latlng, '약국', 1000) : undefined,
            con9: conListItem[8] ? await FindPlace.findPlace(latlng, '헬스장', 250) : undefined,
        }
        
        return conResp
    }

    const ResArrSetting = async (latlng: any) => {
        handelResLoad(true)
        let resResp: ResItemList = {
            res1: resListItem[0] ? await FindPlace.findPlace(latlng, '한식', 250) : undefined,
            res2: resListItem[1] ? await FindPlace.findPlace(latlng, '양식', 250) : undefined,
            res3: resListItem[2] ? await FindPlace.findPlace(latlng, '중식', 250) : undefined,
            res4: resListItem[3] ? await FindPlace.findPlace(latlng, '일식', 250) : undefined,
            res5: resListItem[4] ? await FindPlace.findPlace(latlng, '분식', 250) : undefined,
            res6: resListItem[5] ? await FindPlace.findPlace(latlng, '패스트푸드', 250) : undefined,
        }

        return resResp
    }

    const PlayArrSetting = async (latlng: any) => {
        handelPlayLoad(true)
        let playResp: PlayItemList = {
            play1: playListItem[0] ? await FindPlace.findPlace(latlng, 'PC방', 250) : undefined,
            play2: playListItem[1] ? await FindPlace.findPlace(latlng, '오락실', 250) : undefined,
            play3: playListItem[2] ? await FindPlace.findPlace(latlng, '만화카페', 250) : undefined,
            play4: playListItem[3] ? await FindPlace.findPlace(latlng, '노래방', 250) : undefined,
            play5: playListItem[4] ? await FindPlace.findPlace(latlng, '영화관', 1000) : undefined,
            play6: playListItem[5] ? await FindPlace.findPlace(latlng, '호프', 250) : undefined,
            play7: playListItem[6] ? await FindPlace.findPlace(latlng, '이자카야', 250) : undefined,
            play8: playListItem[7] ? await FindPlace.findPlace(latlng, '칵테일바', 250) : undefined,
        }

        return playResp
    }

    const SearchArrSetting = async (latlng: any) => {
        handelSearchLoad(true)
        return await FindPlace.findPlace(latlng, searchKeyword, searchRange);
    }

    const PubSetting = async (latlng: any) => {
        return await FindPlace.findPlace(latlng, '술집', 250);
    }

    return (
        <React.Fragment>
            {!modalVisible && (
                <div id='map' className='map_inner'></div>
            )}
        </React.Fragment>        
    );
};

export default KakaoMapComponent;