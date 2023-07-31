import React, { useEffect, useState } from 'react';
import KakaoMapComponent from './components/common/KakaoMapComponent';
import Pentagon from './components/common/Pentagon';
import Logo from './assets/logo.png'

function App() {
  // 스크립트 로드 여부
	const [isLoading, setIsLoading] = useState(true);
	const conList = ["편의점", "마트", "세탁소", "미용실", "스터디카페", "은행", "병원", "약국", "헬스장"]
	const resList = ["한식", "양식", "중식", "일식", "분식", "패스트푸드"]
	const playList = ["PC방", "오락실", "만화카페", "노래방", "영화관", "술집"]
	const [conArr, setConArr] = useState([100, 100, 100, 100, 100, 100, 100, 100, 100])
	const [resArr, setResArr] = useState([100, 100, 100, 100, 100, 100])
	const [playArr, setPlayArr] = useState([100, 100, 100, 100, 100, 100])

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
	
	const handleConChange = (e : React.ChangeEvent<HTMLInputElement>, idx: number) => {
		let val = Number(e.target.value)
		let tempArr = conArr
		tempArr[idx] = val
		setConArr([...tempArr])
	}
	
	const handleResChange = (e : React.ChangeEvent<HTMLInputElement>, idx: number) => {
		let val = Number(e.target.value)
		let tempArr = resArr
		tempArr[idx] = val
		setResArr([...tempArr])
	}
	
	const handlePlayChange = (e : React.ChangeEvent<HTMLInputElement>, idx: number) => {
		let val = Number(e.target.value)
		let tempArr = playArr
		tempArr[idx] = val
		setPlayArr([...tempArr])
	}

  	if (isLoading) {
		return <div>Loading...</div>;
	}

  return (
    <div className="App">
		<KakaoMapComponent />
		<div id="containerBox">
			<Pentagon con={1} safety={2} res={3} tra={4} play={5} />
			<div id="centerContainer">
				<div id="checkboxContainer">
					<div className="checkBox">
						<div>
							<span>편의</span>
						</div>
						<div className="checkBoxInside">
						{conList.map((con, idx) => (
							<div>
								<div>{con}</div>
								<input key={idx}
									id="Con1"
									name="RangeBox"
									type="range" value={conArr[idx]} min={0} max={200}
									step={1}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										handleConChange(e, idx)
									}} />
							</div>
						))}
						</div>
					</div>
					<div className="checkBox">
						<div>
							<span>먹거리</span>
						</div>
						<div className="checkBoxInside">
						{resList.map((res, idx) => (
							<div>
								<div>{res}</div>
								<input key={idx}
									id="Con1"
									name="RangeBox"
									type="range" value={resArr[idx]} min={0} max={200}
									step={1}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										handleResChange(e, idx)
									}} />
							</div>
						))}
						</div>
					</div>
					<div className="checkBox">
						<div>
							<span>놀거리</span>
						</div>
						<div className="checkBoxInside">
						{playList.map((play, idx) => (
							<div>
								<div>{play}</div>
								<input key={idx}
									id="Con1"
									name="RangeBox"
									type="range" value={playArr[idx]} min={0} max={200}
									step={1}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										handlePlayChange(e, idx)
									}} />
							</div>
						))}
						</div>
					</div>
				</div>
				<div id="scoreContainer">
					<div className="scoreIndex">
						<button>편의성</button>
						<div id="ConScoreBox" className="scoreBox"></div>
					</div>
					<div className="scoreIndex">
						<button>안전</button>
						<div id="SafetyScoreBox" className="scoreBox"></div>
					</div>
					<div className="scoreIndex">
						<button>먹거리</button>
						<div id="ResScoreBox" className="scoreBox"></div>
					</div>
					<div className="scoreIndex">
						<button>교통성</button>
						<div id="TraScoreBox" className="scoreBox"></div>
					</div>
					<div className="scoreIndex">
						<button>놀거리</button>
						<div id="PlayScoreBox" className="scoreBox"></div>
					</div>
					<div className="scoreIndex">
						<button>총합</button>
						<div id="TotalScoreBox" className="scoreBox"></div>
					</div>
				</div>
        	</div>
			<div id="infobox">
				<p id = "info_p"></p>
				<p id = "count_p"></p>
			</div>
        	<img src={Logo} id="logo" alt='Logo' />
		</div>
    </div>
  );
}

export default App;
