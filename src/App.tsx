import React, { useEffect, useState } from 'react';
import KakaoMapComponent from './components/common/KakaoMapComponent';
import Pentagon from './components/common/Pentagon';
import Logo from './assets/logo.png'
import GetBusInfoAPI from './apis/GetBusInfoAPI';
import BusStopVO from './components/models/BusStopVO';
import GetCCTVInfoAPI from './apis/GetCCTVInfoAPI';
import CCTVInfoVO from './components/models/CCTVInfoVO';
import GetLightInfoAPI from './apis/GetLightInfoAPI';
import LightInfoVO from './components/models/LightInfoVO';
import ConComponent from './components/common/ConComponent';

function App() {
  // 스크립트 로드 여부
	const [isLoading, setIsLoading] = useState(true);
	const conList = ["편의점", "마트", "세탁소", "미용실", "스터디카페", "은행", "병원", "약국", "헬스장"]
	const resList = ["한식", "양식", "중식", "일식", "분식", "패스트푸드"]
	const playList = ["PC방", "오락실", "만화카페", "노래방", "영화관", "술집"]
	const [conArr, setConArr] = useState([100, 100, 100, 100, 100, 100, 100, 100, 100])
	const [resArr, setResArr] = useState([100, 100, 100, 100, 100, 100])
	const [playArr, setPlayArr] = useState([100, 100, 100, 100, 100, 100])
	const [coefArray, setCoefArray] = useState([...conArr, ...resArr, ...playArr])
	//버스정류장 데이터
	const [busStopDataList, setBusStopDataList] = useState([] as BusStopVO[])
	//CCTV 데이터
	const [cctvDataList, setCctvDataList] = useState([] as CCTVInfoVO[])
	//신호등 데이터
	const [lightDataList, setLightDataList] = useState([] as LightInfoVO[])
	//버튼 컨텐츠 넘버
	const [contentNumber, setContentNumber] = useState<number>()
	//점수
	const [conScore, setConScore] = useState<number>()
	const [safetyScore, setSafetyScore] = useState<number>()
	const [resScore, setResScore] = useState<number>()
	const [traScore, setTraScore] = useState<number>()
	const [playScore, setPlayScore] = useState<number>()
	const [sumScore, setSumScore] = useState<number>()
	//전역 카운트
	const [coef_count, setCoef_count] = useState(0)
	//그래프 컬러
	const [rgb, setRgb] = useState<string>()
	//데이터 배열
	const [conArray, setConArray] = useState<any[]>()
	const [pubInfo, setPubInfo] = useState<any>()
	const [resArray, setResArray] = useState<any[]>()
	const [playArray, setPlayArray] = useState<any[]>()
	const [bclArray, setBclArray] = useState<any[]>()

	const coefCountPlus = (init?: number) => {
		setCoef_count((cur) => cur + 1)
		if (init) {
			setCoef_count(init)
		}
	}
	const getCoefCount = () => {
		return coef_count
	}


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
	  
	GetBusInfoAPI.getBusInfoJson().then(setBusStopDataList)
	GetCCTVInfoAPI.getCCTVInfoJson().then(setCctvDataList)
	GetLightInfoAPI.getLightInfoJson().then(setLightDataList)
	
  }, []);
	
	const handleConChange = (e : React.ChangeEvent<HTMLInputElement>, idx: number) => {
		let val = Number(e.target.value)
		let tempArr = conArr
		tempArr[idx] = val
		setConArr([...tempArr])
		setCoefArray([...tempArr, ...resArr, ...playArr])
	}
	
	const handleResChange = (e : React.ChangeEvent<HTMLInputElement>, idx: number) => {
		let val = Number(e.target.value)
		let tempArr = resArr
		tempArr[idx] = val
		setResArr([...tempArr])
		setCoefArray([...conArr, ...tempArr, ...playArr])
	}
	
	const handlePlayChange = (e : React.ChangeEvent<HTMLInputElement>, idx: number) => {
		let val = Number(e.target.value)
		let tempArr = playArr
		tempArr[idx] = val
		setPlayArr([...tempArr])
		setCoefArray([...conArr, ...resArr, ...tempArr])
	}

	const handleInitInfo = () => {
		setContentNumber(undefined)
	}

	const handleScore = (conScore?: number, safetyScore?: number, resScore?: number, traScore?: number, playScore?: number, sum?: number) => {
		if (conScore) {
			setConScore(conScore)
		} else {
			setConScore(undefined)
		}
		if (safetyScore) {
			setSafetyScore(safetyScore)
		} else {
			setSafetyScore(undefined)
		}
		if (resScore) {
			setResScore(resScore)
		} else {
			setResScore(undefined)
		}
		if (traScore) {
			setTraScore(traScore)
		} else {
			setTraScore(undefined)
		}
		if (playScore) {
			setPlayScore(playScore)
		} else {
			setPlayScore(undefined)
		}
		if (sum) {
			setSumScore(sum)
		}
		let r = Math.random() * 255
		let g = Math.random() * 255
		let b = Math.random() * 255
		let str = 'rgba(' + r.toFixed(0) + ', ' + g.toFixed(0) + ', ' + b.toFixed(0) + ', 0.3)'
		setRgb(str)
	}

	const setConData = (conArr: any[]) => {
		setConArray(conArr)
	}
	const setPubData = (pubData: any) => {
		setPubInfo(pubData)
	}
	const setResData = (resArr: any[]) => {
		setResArray(resArr)
	}
	const setPlayData = (playArr: any[]) => {
		setPlayArray(playArr)
	}
	const setBclData = (bclArr: any[]) => {
		setBclArray(bclArr)
	}

  	if (isLoading) {
		return <div>Loading...</div>;
	}

  return (
    <div className="App">
		<KakaoMapComponent
			busStopDataList={busStopDataList}
			cctvDataList={cctvDataList}
			lightDataList={lightDataList}
			handleScore={handleScore}
			coefCountPlus={coefCountPlus}
			coefArray={coefArray}
			getCoefCount={getCoefCount}
			setConData={setConData}
			setPubData={setPubData}
			setResData={setResData}
			setPlayData={setPlayData}
			setBclData={setBclData}
		/>
		<div id="containerBox">
			<Pentagon con={conScore ?? 0} safety={safetyScore ?? 0} res={resScore ?? 0} tra={traScore ?? 0} play={playScore ?? 0} rgb={rgb} />
			<div id="centerContainer">
				<div id="checkboxContainer">
					<div className="checkBox">
						<div>
							<span>편의</span>
						</div>
						<div className="checkBoxInside">
						{conList.map((con, idx) => (
							<div key={idx}>
								<div>{con}</div>
								<input
									id={`Con${idx + 1}`}
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
							<div key={idx}>
								<div>{res}</div>
								<input
									id={`Res${idx + 1}`}
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
							<div key={idx}>
								<div>{play}</div>
								<input
									id={`Play${idx + 1}`}
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
						<button onClick={() => setContentNumber(0)}>편의성</button>
						  <div id="ConScoreBox" className="scoreBox">{conScore ? conScore.toFixed(1) : "0.0"}</div>
					</div>
					<div className="scoreIndex">
						<button onClick={() => setContentNumber(1)}>안전</button>
						<div id="SafetyScoreBox" className="scoreBox">{safetyScore ? safetyScore.toFixed(1) : "0.0"}</div>
					</div>
					<div className="scoreIndex">
						<button onClick={() => setContentNumber(2)}>먹거리</button>
						<div id="ResScoreBox" className="scoreBox">{resScore ? resScore.toFixed(1) : "0.0"}</div>
					</div>
					<div className="scoreIndex">
						<button onClick={() => setContentNumber(3)}>교통성</button>
						<div id="TraScoreBox" className="scoreBox">{traScore ? traScore.toFixed(1) : "0.0"}</div>
					</div>
					<div className="scoreIndex">
						<button onClick={() => setContentNumber(4)}>놀거리</button>
						<div id="PlayScoreBox" className="scoreBox">{playScore ? playScore.toFixed(1) : "0.0"}</div>
					</div>
					<div className="scoreIndex">
						<button>총합</button>
						  <div id="TotalScoreBox" className="scoreBox">{sumScore ?? "0.0"}</div>
					</div>
				</div>
        	</div>
			<ConComponent
				  contentNumber={contentNumber}
				  handleInitInfo={handleInitInfo}
				  conArray={conArray}
					pubInfo={pubInfo}
					resArray={resArray}
					playArray={playArray}
					bclArray={bclArray}
			/>
        	<img src={Logo} id="logo" alt='Logo' />
		</div>
    </div>
  );
}

export default App;
