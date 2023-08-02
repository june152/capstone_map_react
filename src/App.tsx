import React, { useEffect, useState } from 'react';
import KakaoMapComponent from './components/common/KakaoMapComponent';
import Logo from './assets/logo.png'

function App() {
  // 스크립트 로드 여부
	const [isLoading, setIsLoading] = useState(true);
	const conList = ["편의점", "마트", "세탁소", "미용실", "스터디카페", "은행", "병원", "약국", "헬스장"]
	const resList = ["한식", "양식", "중식", "일식", "분식", "패스트푸드"]
	const playList = ["PC방", "오락실", "만화카페", "노래방", "영화관", "술집"]


  useEffect(() => {
	// 카카오 지도 API 스크립트 동적으로 로드
	const script = document.createElement("script");
	script.async = true;
	script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ba63d442ec8e460a727e5030c9e0436b&autoload=false&libraries=services,clusterer,drawing`;
	document.head.appendChild(script);

	script.onload = () => {
		window.kakao.maps.load(() => {
			setIsLoading(false)
		})
	}	
  }, []);

  	if (isLoading) {
		return <div>Loading...</div>;
	}

  return (
    <div className="App">
		<KakaoMapComponent />
		<div id="containerBox">
			<div id="centerContainer">
        	</div>
		</div>
    </div>
  );
}

export default App;
