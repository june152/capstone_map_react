import React, { useEffect, useState } from 'react';
import KakaoMapComponent from './components/common/KakaoMapComponent';
import Logo from './assets/logo.png'
import BottomBar from './components/common/BottomBar';
import HeaderBar from './components/common/HeaderBar';
import TitleImg from './assets/title.png'
import { ConItemList } from './components/models/ConItemList';
import { ResItemList } from './components/models/ResItemList';
import { PlayItemList } from './components/models/PlayItemList';
import PlaceVO from './components/models/PlaceVO';
import ConMarker from './assets/ic_marker04.png'
import ResMarker from './assets/ic_marker01.png'
import Playmarker from './assets/ic_marker03.png'

export type TabMenu = 
	| "Home"
	| "Favorite"
	| "Profile"

export interface MarkerItemSet {
	itemList: PlaceVO[],
	markerList: any[],
}

function App() {
	const [isLoading, setIsLoading] = useState(true);	//스크립트 로드 여부
	const conList = ["편의점", "마트", "세탁소", "미용실", "스터디카페", "은행", "병원", "약국", "헬스장"]
	const resList = ["한식", "양식", "중식", "일식", "분식", "패스트푸드"]
	const playList = ["PC방", "오락실", "만화카페", "노래방", "영화관", "술집"]
	//	tab state
	const [tab, setTab] = useState<TabMenu>("Home")
	//	default Data List
	const [conItemList, setConItemList] = useState<ConItemList>()
	const [resItemList, setResItemList] = useState<ResItemList>()
	const [playItemList, setPlayItemList] = useState<PlayItemList>()
	const [conMarkerSetList, setConMarkerSetList] = useState<MarkerItemSet[]>()

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

	const onTabChange = (tab: TabMenu) => {
		setTab(tab)
	}

	const handleConItemList = (conArr: ConItemList) => {
		setConItemList(conArr)
		setConMarker(conArr)
	}
	const handleResItemList = (resArr: ResItemList) => {
		setResItemList(resArr)
	}
	const handlePlayItemList = (playArr: PlayItemList) => {
		setPlayItemList(playArr)
	}

	const setConMarker = (conItemList?: ConItemList) => {
		if (!conItemList) {
			return
		}
		let tempArr = []
		tempArr.push(conItemList.con1 ? drawConMarker(conItemList.con1) : undefined)
		tempArr.push(conItemList.con2 ? drawConMarker(conItemList.con2) : undefined)
		tempArr.push(conItemList.con3 ? drawConMarker(conItemList.con3) : undefined)
		tempArr.push(conItemList.con4 ? drawConMarker(conItemList.con4) : undefined)
		tempArr.push(conItemList.con5 ? drawConMarker(conItemList.con5) : undefined)
		tempArr.push(conItemList.con6 ? drawConMarker(conItemList.con6) : undefined)
		tempArr.push(conItemList.con7 ? drawConMarker(conItemList.con7) : undefined)
		tempArr.push(conItemList.con8 ? drawConMarker(conItemList.con8) : undefined)
		tempArr.push(conItemList.con9 ? drawConMarker(conItemList.con9) : undefined)
		setConMarkerSetList(tempArr as MarkerItemSet[])
	}

	const drawConMarker = (conPlaceArr: PlaceVO[]): MarkerItemSet => {
		let markerList = new Array()
		conPlaceArr.map((con) => {
			//마커 표시 위치
			let markerPosition = new window.kakao.maps.LatLng(Number(con.y), Number(con.x))
			//마커 생성
			let marker = new window.kakao.maps.Marker({
				position: markerPosition,
			})
			markerList.push(marker)
		})
		return {itemList: conPlaceArr, markerList: markerList} as MarkerItemSet
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div id='wrapper' className='map_wrapper'>
			<HeaderBar
					element={
						<img
							src={TitleImg}
							alt="근처를 부탁해!"
							style={{ width: 200, height: 40, objectFit: 'contain', objectPosition: 'center' }}
						/>
					}
				/>
			<main>
				<article className='container'>
					<KakaoMapComponent
						conItemList={conItemList}
						resItemList={resItemList}
						playItemList={playItemList}
						handleConItemList={handleConItemList}
						handleResItemList={handleResItemList}
						handlePlayItemList={handlePlayItemList}
						conMarkerSetList={conMarkerSetList}
					/>
				</article>
			</main>
			<BottomBar tab={tab} onTabChange={onTabChange} />
		</div>
	);
}

export default App;
