import React, { useEffect, useState } from 'react';
import './App.css';
import KakaoMapComponent from './components/common/KakaoMapComponent';
import Pentagon from './components/common/Pentagon';

function App() {
  // 스크립트 로드 여부
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
		// 카카오 지도 API 스크립트 동적으로 로드
		const script = document.createElement("script");
		script.async = true;
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ba63d442ec8e460a727e5030c9e0436b&autoload=false&libraries=services,clusterer,drawing`;
		document.head.appendChild(script);

		script.onload = () => {
			window.kakao.maps.load(() => {
				setIsLoading(false);
			});
		};
  }, []);
  
  if (isLoading) {
		return <div>Loading...</div>;
	}

  return (
    <div className="App">
		  <KakaoMapComponent />
		  <Pentagon con={1} safety={2} res={3} tra={4} play={5} />
    </div>
  );
}

export default App;
