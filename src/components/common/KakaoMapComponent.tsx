import React, { useEffect, useState } from 'react';
import BusStopVO from '../models/BusStopVO';
import CCTVInfoVO from '../models/CCTVInfoVO';
import LightInfoVO from '../models/LightInfoVO';
import FindPlace from '../../utils/FindPlace';
import PlaceVO from '../models/PlaceVO';
import { ConItemList } from '../models/ConItemList';
import { ResItemList } from '../models/ResItemList';
import { PlayItemList } from '../models/PlayItemList';

interface KakaoMapComponentProps {
    
}

const KakaoMapComponent = ({} : KakaoMapComponentProps) => {
    const [mapState, setMapState] = useState<any>()
    const [myLatLng, setMyLatLng] = useState()
    const [clickLatLng, setClickLatLng] = useState()
    const [lat, setLat] = useState<number>()
    const [lng, setLng] = useState<number>()
    const [cLat, setCLat] = useState<number>()
    const [cLng, setCLng] = useState<number>()
    
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(cLat ?? 35.17690999613079, cLng ?? 126.90610797027583), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
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

        const circle_100 = new window.kakao.maps.Circle({
            radius: 100, // 미터 단위의 원의 반지름입니다
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: '#', // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#3588F3', // 채우기 색깔입니다
            fillOpacity: 0.1, // 채우기 불투명도 입니다
            position: map.getCenter()
        })
        
        const circle_200 = new window.kakao.maps.Circle({
            radius: 200, // 미터 단위의 원의 반지름입니다
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: '#', // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#C08035', // 채우기 색깔입니다
            fillOpacity: 0.1, // 채우기 불투명도 입니다
            position: map.getCenter()
        })

        const circle_500 = new window.kakao.maps.Circle({
            radius: 500, // 미터 단위의 원의 반지름입니다
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: '#', // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#295321', // 채우기 색깔입니다
            fillOpacity: 0.1, // 채우기 불투명도 입니다
            position: map.getCenter()
        });

        // 지도 클릭 이벤트 핸들러 등록
        window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
            // 지도에 마커를 표시합니다
            circle_100.setMap(map)
            circle_200.setMap(map)
            circle_500.setMap(map)
            const clickedLatLng = mouseEvent.latLng;
            setClickLatLng(clickedLatLng)
			setLng(clickedLatLng.getLng());
            setLat(clickedLatLng.getLat());
            circle_100.setPosition(clickedLatLng);
            circle_200.setPosition(clickedLatLng);
            circle_500.setPosition(clickedLatLng);
            console.log("clickedLatLng  :: ", clickedLatLng)
            
            ConArrSetting(clickedLatLng).then((res) => {
                console.log("ConArrSetting : ", res)
            })
            ResArrSetting(clickedLatLng).then((res) => {
                console.log("ResArrSetting : ", res)
            })
            PlayArrSetting(clickedLatLng).then((res) => {
                console.log("PlayArrSetting : ", res)
            })

            PubSetting(clickedLatLng).then((res) => {
                console.log("술집 : ", res)
            })
        });

        window.kakao.maps.event.addListener(map, "dragend", () => {
            const center = map.getCenter()
            setCLat(center.getLat())
            setCLng(center.getLng()) 
        })
    }, [])

    const ConArrSetting = async (latlng: any) => {
        let conResp: ConItemList = {
            con1: await FindPlace.findPlace(latlng, '편의점', 200),
            con2: await FindPlace.findPlace(latlng, '마트', 200),
            con3: await FindPlace.findPlace(latlng, '세탁소', 200),
            con4: await FindPlace.findPlace(latlng, '미용실', 200),
            con5: await FindPlace.findPlace(latlng, '스터디카페', 250),
            con6: await FindPlace.findPlace(latlng, '은행', 500),
            con7: await FindPlace.findPlace(latlng, '병원', 500),
            con8: await FindPlace.findPlace(latlng, '약국', 500),
            con9: await FindPlace.findPlace(latlng, '헬스장', 250),
        }
        
        return conResp
    }

    const ResArrSetting = async (latlng: any) => {
        let resResp: ResItemList = {
            res1: await FindPlace.findPlace(latlng, '한식', 200),
            res2: await FindPlace.findPlace(latlng, '양식', 200),
            res3: await FindPlace.findPlace(latlng, '중식', 200),
            res4: await FindPlace.findPlace(latlng, '일식', 200),
            res5: await FindPlace.findPlace(latlng, '분식', 200),
            res6: await FindPlace.findPlace(latlng, '패스트푸드', 200),
        }

        return resResp
    }

    const PlayArrSetting = async (latlng: any) => {
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
        return await FindPlace.findPlace(latlng, '술집', 250); // Pub은 가장 나중에 호출할 것
    }

    return (
        <div id='map'></div>
    );
};

export default KakaoMapComponent;