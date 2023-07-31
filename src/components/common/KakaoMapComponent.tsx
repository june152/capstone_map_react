import React, { useEffect, useState } from 'react';

const KakaoMapComponent = () => {
    const [mapState, setMapState] = useState<any>();
    const [myLatLng, setMyLatLng] = useState();
    const [lat, setLat] = useState<number>();
	const [lng, setLng] = useState<number>();
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(35.17690999613079, 126.90610797027583), // 지도의 중심좌표
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
                    setMyLatLng(currentLatLng);
                    map.setCenter(currentLatLng)
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
            strokeColor: '#75B8FA', // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#CFE7FF', // 채우기 색깔입니다
            fillOpacity: 0.5, // 채우기 불투명도 입니다
            position: map.getCenter()
        });
        
        const circle_200 = new window.kakao.maps.Circle({
            radius: 200, // 미터 단위의 원의 반지름입니다
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: '#123456', // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#654321', // 채우기 색깔입니다
            fillOpacity: 0.3, // 채우기 불투명도 입니다
            position: map.getCenter()
        });

        // 지도에 마커를 표시합니다
		circle_100.setMap(map);
		circle_200.setMap(map);
        
        // 지도 클릭 이벤트 핸들러 등록
		window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
			const clickedLatLng = mouseEvent.latLng;
			setLng(clickedLatLng.getLng());
            setLat(clickedLatLng.getLat());
            circle_100.setPosition(clickedLatLng);
            circle_200.setPosition(clickedLatLng);
			console.log(
				"클릭한 위치의 좌표:",
				clickedLatLng.getLat(),
				clickedLatLng.getLng()
            );
        });
            
    }, [])

    return (
        <div id='map' style={{width: "100%", height: "60vh"}}>
        </div>
    );
};

export default KakaoMapComponent;