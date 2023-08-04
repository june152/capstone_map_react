import React, { useEffect, useState } from 'react';
import BusStopVO from '../models/BusStopVO';
import CCTVInfoVO from '../models/CCTVInfoVO';
import LightInfoVO from '../models/LightInfoVO';
import FindPlace from '../../utils/FindPlace';
import PlaceVO from '../models/PlaceVO';
import { ConItemList } from '../models/ConItemList';
import { ResItemList } from '../models/ResItemList';
import { PlayItemList } from '../models/PlayItemList';
import ConMarker from '../../assets/mk_10.png'
import ResMarker from '../../assets/mk_1.png'
import PlayMarker from '../../assets/mk_6.png'
import InfoWindow from './InfoWindow';
import { MarkerItemSet } from '../../App';

interface KakaoMapComponentProps {
    conItemList?: ConItemList,
    resItemList?: ResItemList,
    playItemList?: PlayItemList,
    handleConItemList: Function,
    handleResItemList: Function,
    handlePlayItemList: Function,
    conMarkerSetList?: MarkerItemSet[],
    resMarkerSetList?: MarkerItemSet[],
    playMarkerSetList?: MarkerItemSet[],
    handelConLoad: Function,
    handelResLoad: Function,
    handelPlayLoad: Function,
}

const KakaoMapComponent = ({
    conItemList,
    resItemList,
    playItemList,
    handleConItemList,
    handleResItemList,
    handlePlayItemList,
    conMarkerSetList,
    resMarkerSetList,
    playMarkerSetList,
    handelConLoad,
    handelResLoad,
    handelPlayLoad,
}: KakaoMapComponentProps) => {
    const [mapState, setMapState] = useState<any>()
    //현재 내 위치
    const [myLatLng, setMyLatLng] = useState()
    //클릭한 위치
    const [clickLatLng, setClickLatLng] = useState()
    const [lat, setLat] = useState<number>()
    const [lng, setLng] = useState<number>()
    //현재 map level
    const [cLevel, setCLevel] = useState<number>()
    //클릭위치 끝
    const [cLat, setCLat] = useState<number>()
    const [cLng, setCLng] = useState<number>()
    
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(cLat ?? 35.17690999613079, cLng ?? 126.90610797027583), // 지도의 중심좌표
            level: cLevel ?? 4 // 지도의 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, options);
        setMapState(map);
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
                    }
                }
            })
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
        });

        window.kakao.maps.event.addListener(map, "dragend", () => {
            setCLevel(map.getLevel())
            const center = map.getCenter()
            setCLat(center.getLat())
            setCLng(center.getLng()) 
        })
    }, [conMarkerSetList,resMarkerSetList,playMarkerSetList])

    const ConArrSetting = async (latlng: any) => {
        handelConLoad(true)
        let conResp: ConItemList = {
            con1: await FindPlace.findPlace(latlng, '편의점', 250),
            con2: await FindPlace.findPlace(latlng, '마트', 250),
            con3: await FindPlace.findPlace(latlng, '세탁소', 250),
            con4: await FindPlace.findPlace(latlng, '미용실', 250),
            con5: await FindPlace.findPlace(latlng, '스터디카페', 250),
            con6: await FindPlace.findPlace(latlng, '은행', 500),
            con7: await FindPlace.findPlace(latlng, '병원', 1000),
            con8: await FindPlace.findPlace(latlng, '약국', 1000),
            con9: await FindPlace.findPlace(latlng, '헬스장', 250),
        }
        
        return conResp
    }

    const ResArrSetting = async (latlng: any) => {
        handelResLoad(true)
        let resResp: ResItemList = {
            res1: await FindPlace.findPlace(latlng, '한식', 250),
            res2: await FindPlace.findPlace(latlng, '양식', 250),
            res3: await FindPlace.findPlace(latlng, '중식', 250),
            res4: await FindPlace.findPlace(latlng, '일식', 250),
            res5: await FindPlace.findPlace(latlng, '분식', 250),
            res6: await FindPlace.findPlace(latlng, '패스트푸드', 250),
        }

        return resResp
    }

    const PlayArrSetting = async (latlng: any) => {
        handelPlayLoad(true)
        let playResp: PlayItemList = {
            play1: await FindPlace.findPlace(latlng, 'PC방', 250),
            play2: await FindPlace.findPlace(latlng, '오락실', 250),
            play3: await FindPlace.findPlace(latlng, '만화카페', 250),
            play4: await FindPlace.findPlace(latlng, '노래방', 250),
            play5: await FindPlace.findPlace(latlng, '영화관', 1000),
            play6: await FindPlace.findPlace(latlng, '호프', 250),
            play7: await FindPlace.findPlace(latlng, '이자카야', 250),
            play8: await FindPlace.findPlace(latlng, '칵테일바', 250)
        }

        return playResp
    }

    const PubSetting = async (latlng: any) => {
        return await FindPlace.findPlace(latlng, '술집', 250);
    }

    return (
        <div id='map' className='map_inner'></div>
    );
};

export default KakaoMapComponent;