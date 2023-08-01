import React, { useEffect, useState } from 'react';
import BusStopVO from '../models/BusStopVO';
import CCTVInfoVO from '../models/CCTVInfoVO';
import LightInfoVO from '../models/LightInfoVO';
import FindPlace from '../../utils/FindPlace';

interface KakaoMapComponentProps {
    busStopDataList: BusStopVO[],
    cctvDataList: CCTVInfoVO[],
    lightDataList: LightInfoVO[],
    handleScore: Function,
    coefCountPlus: Function,
    coefArray: number[],
    getCoefCount: Function,
    setConData: Function,
    setPubData: Function,
    setResData: Function,
    setPlayData: Function,
    setBclData: Function,
}

const KakaoMapComponent = ({
    busStopDataList, cctvDataList, lightDataList, handleScore, coefCountPlus, coefArray, getCoefCount, setConData, setPubData, setResData, setPlayData, setBclData
} : KakaoMapComponentProps) => {
    const [mapState, setMapState] = useState<any>()
    const [myLatLng, setMyLatLng] = useState()
    const [clickLatLng, setClickLatLng] = useState()
    const [lat, setLat] = useState<number>()
    const [lng, setLng] = useState<number>()
    const [cLat, setCLat] = useState<number>()
    const [cLng, setCLng] = useState<number>()

    const coefCountUp = (init?: number) => {
        coefCountPlus()
        if (init) {
            coefCountPlus(init)
        }
    }
    
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

        // 지도에 마커를 표시합니다
		circle_100.setMap(map)
        circle_200.setMap(map)
        circle_500.setMap(map)
        
        let bus_cctv_Array = new Array()    // 버스와 cctv 정보 저장할 배열
        let tra: number
        let safety: number
        
        if (clickLatLng) {
            circle_100.setPosition(clickLatLng);
            circle_200.setPosition(clickLatLng);
            circle_500.setPosition(clickLatLng);

            bus_cctv_Array = count_BUSSTOP_CCTV_LIGHT(lat!, lng!)
            setBclData(bus_cctv_Array)
            tra = traScoreCalc(bus_cctv_Array)
            safety = safetyScoreCalc(bus_cctv_Array)
            
            let conTemp = 0
            let resTemp = 0
            let playTemp = 0
            let sum = tra

            ConArrSetting(new Array(), clickLatLng).then((res) => {
                for (const key of res) conTemp += key[0]
                sum += makeRange(conTemp)
                setConData(res)
            })
            ResArrSetting(new Array(), clickLatLng).then((res) => {
                for (const key of res) resTemp += key[0]
                sum += makeRange(resTemp)
                setResData(res)
            })
            PlayArrSetting(new Array(), clickLatLng).then((res) => {
                for (const key of res) playTemp += key[0]
                sum += makeRange(playTemp)
                setPlayData(res)
            })

            PubSetting(clickLatLng).then((res) => {
                safety = makeRange(safety - res[0])
                sum += safety
                setPubData(res)
            })

            setTimeout(() => {
                handleScore(makeRange(conTemp), safety, makeRange(resTemp), tra, makeRange(playTemp), Number(sum.toFixed(1)))
            }, 1000)
        }

        // 지도 클릭 이벤트 핸들러 등록
		window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
            const clickedLatLng = mouseEvent.latLng;
            console.log("clickedLatLng : ", clickedLatLng)
            setClickLatLng(clickedLatLng)
			setLng(clickedLatLng.getLng());
            setLat(clickedLatLng.getLat());
            circle_100.setPosition(clickedLatLng);
            circle_200.setPosition(clickedLatLng);
            circle_500.setPosition(clickedLatLng);
			// console.log(
			// 	"클릭한 위치의 좌표:",
			// 	clickedLatLng.getLat(),
			// 	clickedLatLng.getLng()
            // );

            bus_cctv_Array = count_BUSSTOP_CCTV_LIGHT(clickedLatLng.getLat(), clickedLatLng.getLng())
            setBclData(bus_cctv_Array)
            tra = traScoreCalc(bus_cctv_Array)
            safety = safetyScoreCalc(bus_cctv_Array)
            
            let conTemp = 0
            let resTemp = 0
            let playTemp = 0
            let sum = tra
            console.log("클릭 시 coefArr : ", coefArray)
            ConArrSetting(new Array(), clickedLatLng).then((res) => {
                for (const key of res) conTemp += key[0]
                sum += makeRange(conTemp)
                setConData(res)
            })
            ResArrSetting(new Array(), clickedLatLng).then((res) => {
                for (const key of res) resTemp += key[0]
                sum += makeRange(resTemp)
                setResData(res)
            })
            PlayArrSetting(new Array(), clickedLatLng).then((res) => {
                for (const key of res) playTemp += key[0]
                sum += makeRange(playTemp)
                setPlayData(res)
            })

            PubSetting(clickedLatLng).then((res) => {
                safety = makeRange(safety - res[0])
                sum += safety
                setPubData(res)
            })

            setTimeout(() => {
                handleScore(makeRange(conTemp), safety, makeRange(resTemp), tra, makeRange(playTemp), Number(sum.toFixed(1)))
            }, 1000)
        });

        window.kakao.maps.event.addListener(map, "dragend", () => {
            const center = map.getCenter()
            setCLat(center.getLat())
            setCLng(center.getLng()) 
        })
    }, [coefArray])

    const getDistanceFromLatLonInKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
        const deg2rad = (deg: number) => {
            return deg * (Math.PI / 180)
        }
        const R = 6371  // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1)
        const dLon = deg2rad(lng2 - lng1)
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const d = R * c // Distance in km

        return 1000*d; // retrun
    }

    const count_BUSSTOP_CCTV_LIGHT = (mouse_lat: number, mouse_long: number) => {
        let count_BCL = new Array()
        let i = 2
        let distance = 0
        let bus_index = 0   // 버스 정류장의 개수를 저장할 변수
        let cctv_index = 0  // CCTV 개수를 저장할 변수
        
        busStopDataList.forEach((busData) => {
            distance = getDistanceFromLatLonInKm(busData.LATITUDE, busData.LONGITUDE, mouse_lat, mouse_long)
            if (distance <= 500) {
                bus_index++
                count_BCL[i] = distance
                i++
            }
        })

        cctvDataList.forEach((cctvData) => {
            distance = getDistanceFromLatLonInKm(cctvData.LATITUDE, cctvData.LONGITUDE, mouse_lat, mouse_long)
            if (distance <= 250) {
                cctv_index++
                count_BCL[i] = distance
                i++
            }
        })

        lightDataList.forEach((lightData) => {
            distance = getDistanceFromLatLonInKm(lightData.LATITUDE, lightData.LONGITUDE, mouse_lat, mouse_long)
            if (distance <= 100) {
                count_BCL[i] = distance
                i++
            }
        })

        count_BCL[0] = bus_index
        count_BCL[1] = cctv_index
        //console.log(count_BCL)
        return count_BCL
    }

    const traScoreCalc = (bcArr: any[]) => {    // 교통성 점수 내는 함수
        let score = 0
        let i = 0
        let idx = bcArr[0]

        for (i = 1; i < idx; i++) {
            if (bcArr[i] < 200) score += 0.5
            else score += (100/bcArr[i])
        }

        if(score > 5) {   
            score = 5
        }

        return Number(score.toFixed(1))
    }

    const safetyScoreCalc = (bcArr: any[]) => {
        let score = 0
        let i = 0
        let idx = bcArr[0]    // 버스 정류장 개수
        let idx2 = bcArr[1]   // CCTV

        
        for(i=2+idx; i<2+idx+idx2; i++) {   // CCTV 개수만큼
            if(bcArr[i] < 100) score += 0.5;
            else score += (50/bcArr[i]);
        }
        for(i; i<bcArr.length; i++) {
            score += 0.05;
        }
        return score;
    }

    const makeRange = (x: number) => {
        if(x > 5) x = 5
        if (x < 0) x = 0
        return Number(x.toFixed(1))
    }

    const ConArrSetting = async (ConArray: any[], latlng: any) => {
        let count = 0
        // console.log("count : ", count)
        ConArray.push(await FindPlace.findPlace(latlng, '편의점', 200, 100, 20, coefArray[count++], coefCountUp))
        ConArray.push(await FindPlace.findPlace(latlng, '마트', 200, 100, 20, coefArray[count++], coefCountUp))
        ConArray.push(await FindPlace.findPlace(latlng, '세탁소', 200, 35, 7, coefArray[count++], coefCountUp))
        ConArray.push(await FindPlace.findPlace(latlng, '미용실', 200, 20, 4, coefArray[count++], coefCountUp))
        ConArray.push(await FindPlace.findPlace(latlng, '스터디카페', 250, 75, 15, coefArray[count++], coefCountUp))
        ConArray.push(await FindPlace.findPlace(latlng, '은행', 500, 40, 8, coefArray[count++], coefCountUp))
        ConArray.push(await FindPlace.findPlace(latlng, '병원', 500, 35, 7, coefArray[count++], coefCountUp))
        ConArray.push(await FindPlace.findPlace(latlng, '약국', 500, 35, 7, coefArray[count++], coefCountUp))
        ConArray.push(await FindPlace.findPlace(latlng, '헬스장', 250, 50, 10, coefArray[count++], coefCountUp))
        // console.log("countAfter : ", count)
        coefCountUp(count)

        return ConArray
    }

    const ResArrSetting = async (ResArray: any[], latlng: any) => {
        let count = 9
        // console.log("count : ", count)
        ResArray.push(await FindPlace.findPlace(latlng, '한식', 200, 50, 10, coefArray[count++], coefCountUp))
        ResArray.push(await FindPlace.findPlace(latlng, '양식', 200, 50, 10, coefArray[count++], coefCountUp))
        ResArray.push(await FindPlace.findPlace(latlng, '중식', 200, 50, 10, coefArray[count++], coefCountUp))
        ResArray.push(await FindPlace.findPlace(latlng, '일식', 200, 50, 10, coefArray[count++], coefCountUp))
        ResArray.push(await FindPlace.findPlace(latlng, '분식', 200, 50, 10, coefArray[count++], coefCountUp))
        ResArray.push(await FindPlace.findPlace(latlng, '패스트푸드', 200, 50, 10, coefArray[count++], coefCountUp))
        // console.log("countAfter : ", count)
        coefCountUp(count)

        return ResArray
    }

    const PlayArrSetting = async (PlayArray: any[], latlng: any) => {
        let count = 15
        // console.log("count : ", count)
        PlayArray.push(await FindPlace.findPlace(latlng, 'PC방', 250, 50, 10, coefArray[count++], coefCountUp))
        PlayArray.push(await FindPlace.findPlace(latlng, '오락실', 250, 50, 10, coefArray[count++], coefCountUp))
        PlayArray.push(await FindPlace.findPlace(latlng, '만화카페', 250, 50, 10, coefArray[count++], coefCountUp))
        PlayArray.push(await FindPlace.findPlace(latlng, '노래방', 250, 50, 10, coefArray[count++], coefCountUp))
        PlayArray.push(await FindPlace.findPlace(latlng, '영화관', 1000, 50, 10, coefArray[count++], coefCountUp))
        PlayArray.push(await FindPlace.findPlace(latlng, '호프', 250, 50, 10, coefArray[count], coefCountUp))
        PlayArray.push(await FindPlace.findPlace(latlng, '이자카야', 250, 50, 10, coefArray[count], coefCountUp))
        PlayArray.push(await FindPlace.findPlace(latlng, '칵테일바', 250, 50, 10, coefArray[count], coefCountUp))
        // console.log("countAfter : ", count)
        coefCountUp(count)

        return PlayArray
    }

    const PubSetting = async (latlng: any) => {
        return await FindPlace.findPlace(latlng, '술집', 100, 15, 3, 100, coefCountUp); // Pub은 가장 나중에 호출할 것
    }

    return (
        <div id='map'></div>
    );
};

export default KakaoMapComponent;