import React, { useEffect, useRef, useState } from 'react';
import KakaoMapComponent from './components/common/KakaoMapComponent';
import BottomBar from './components/common/BottomBar';
import HeaderBar from './components/common/HeaderBar';
import TitleImg from './assets/title.png'
import { ConItemList } from './components/models/ConItemList';
import { ResItemList } from './components/models/ResItemList';
import { PlayItemList } from './components/models/PlayItemList';
import PlaceVO from './components/models/PlaceVO';
import ContactDialog from './components/common/ContactDialog';
import BottomPanel from './components/common/BottomPanel';
import WinFrameDialog from './components/BottomPanelComponent/WinFrameDialog';
import ClusteritemWindow from './components/common/ClusteritemWindow';
import FindPlace from './utils/FindPlace';

export type TabMenu = 
	| "Home"
	| "Favorite"
	| "Profile"

export interface MarkerItemSet {
	itemList: PlaceVO[],
	markerList: any[],
}

export interface PositionData {
    positionY: number,
    height: number,
    isPanelOpen: boolean,
}

function App() {
	const [isLoading, setIsLoading] = useState(true);	//스크립트 로드 여부
	//	tab state
	const [tab, setTab] = useState<TabMenu>("Home")
	//	default Data List
	const [conItemList, setConItemList] = useState<ConItemList>()
	const [resItemList, setResItemList] = useState<ResItemList>()
	const [playItemList, setPlayItemList] = useState<PlayItemList>()
	const [conMarkerSetList, setConMarkerSetList] = useState<MarkerItemSet[]>()
	const [resMarkerSetList, setResMarkerSetList] = useState<MarkerItemSet[]>()
	const [playMarkerSetList, setPlayMarkerSetList] = useState<MarkerItemSet[]>()
	const [searchMarkerSetList, setSearchMarkerSetList] = useState<MarkerItemSet>()
	const [searchResult, setSearchResult] = useState<PlaceVO[]>()
	//로딩창 모달
	const [modalVisible, setModalVisible] = useState(false)
	const [modalFade, setModalFade] = useState(false)
	const handleModalToggle = (isVisible : boolean) => {
		setModalVisible(isVisible)
		setModalFade(false)
	}
	//Loading
    const [conLoad, setConLoad] = useState(false)
    const [resLoad, setResLoad] = useState(false)
	const [playLoad, setPlayLoad] = useState(false)
	const [searchLoad, setSearchLoad] = useState(false)
	const handelConLoad = (isLoad: boolean) => {
		setConLoad(isLoad)
	}
	const handelResLoad = (isLoad: boolean) => {
		setResLoad(isLoad)
	}
	const handelPlayLoad = (isLoad: boolean) => {
		setPlayLoad(isLoad)
	}
	const handelSearchLoad = (isLoad: boolean) => {
		setSearchLoad(isLoad)
	}

	useEffect(() => {
		if (conLoad || resLoad || playLoad || searchLoad) {
			handleModalToggle(true)
		} else {
			setModalFade(true)
		}
	}, [conLoad, resLoad, playLoad, searchLoad])

	//하단 드래그바
	const [isActive, setIsActive] = useState(false)
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const startPoint = useRef<PositionData>(
        {
            positionY: 0,
            height: window.innerHeight - 180,
            isPanelOpen: false,
        }
    )
	const [panelHeight, setPanelHeight] = useState(startPoint.current.height)
	const dragHandle = useRef<HTMLDivElement>(null)

	//검색필터
    const [cateConCheck, setCateConCheck] = useState(true)
    const [cateResCheck, setCateResCheck] = useState(true)
    const [catePlayCheck, setCatePlayCheck] = useState(true)
    const [conListItem, setConListItem] = useState([true, true, true, true, true, true, true, true, true])
    const [resListItem, setResListItem] = useState([true, true, true, true, true, true])
	const [playListItem, setPlayListItem] = useState([true, true, true, true, true, true, true, true])
	const [searchKeyword, setSearchKeyword] = useState("")
	const [searchRange, setSearchRange] = useState(300)

    const handleConCheck = (checked: boolean) => {
        setCateConCheck(checked)
    }
    const handleResCheck = (checked: boolean) => {
        setCateResCheck(checked)
    }
    const handlePlayCheck = (checked: boolean) => {
        setCatePlayCheck(checked)
	}
	const handleConListChange = (checkList: boolean[]) => {
		setConListItem(checkList)
	}
	const handleResListChange = (checkList: boolean[]) => {
		setResListItem(checkList)
	}
	const handlePlayListChange = (checkList: boolean[]) => {
		setPlayListItem(checkList)
	}

	const handleKeywordInput = (keyword: string) => {
		setSearchKeyword(keyword)
	}
	const handleRangeChange = (range: number) => {
		setSearchRange(range)
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
	}, []);

	useEffect(() => {
		//하단 드래그 이벤트
		let changeValue = window.innerHeight - 180
        const getPositionY = (e: MouseEvent | TouchEvent) => {
            if (e instanceof TouchEvent) {
                return e.touches[0].pageY
			} else {
				// console.log("e.pageY : ", e.pageY)
                return e.pageY
            }
		}

        const onHandleStart = (e: MouseEvent | TouchEvent) => {
            startPoint.current.positionY = getPositionY(e)
            // console.log("start : ", getPositionY(e))
            setIsActive(true)
        }

        const onHandleMove = (e: MouseEvent | TouchEvent) => {
            const y = getPositionY(e)
            const dY = startPoint.current.positionY - y
            changeValue = startPoint.current.height - dY
            
            setPanelHeight(changeValue)
        }

        const onHandleEnd = (e: MouseEvent | TouchEvent) => {
            setIsActive(false)
            if (!startPoint.current.isPanelOpen) { //closed -> open
                if (changeValue <= window.innerHeight / 2) {
                    startPoint.current.isPanelOpen = true
                    setIsPanelOpen(true)
                    startPoint.current.height = 0
                    setPanelHeight(0)
                } else {
                    startPoint.current.height = window.innerHeight - 180
                    setPanelHeight(window.innerHeight - 180)
                }
            } else {    //open -> closed
                if (changeValue >= window.innerHeight / 2) {
                    startPoint.current.isPanelOpen = false
                    setIsPanelOpen(false)
                    startPoint.current.height = window.innerHeight - 180
                    setPanelHeight(window.innerHeight - 180)
                } else {
                    startPoint.current.height = 0
                    setPanelHeight(0)
                }
            }
        }

        const dragHandler = dragHandle.current
		if (!dragHandler) {
            return
		}
        dragHandler.addEventListener('mousedown', onHandleStart)
        dragHandler.addEventListener('touchstart', onHandleStart)

        window.addEventListener('mousemove', onHandleMove)
        window.addEventListener('touchmove', onHandleMove)

        window.addEventListener('mouseup', onHandleEnd)
        window.addEventListener('touchend', onHandleEnd)

        return () => {
            dragHandler.removeEventListener('mousedown', onHandleStart)
            dragHandler.removeEventListener('touchstart', onHandleStart)

            window.removeEventListener('mousemove', onHandleMove)
            window.removeEventListener('touchmove', onHandleMove)

            window.removeEventListener('mouseup', onHandleEnd)
            window.removeEventListener('touchend', onHandleEnd)
        }
	}, [])

	const onTabChange = (tab: TabMenu) => {
		setTab(tab)
	}

	const handleConItemList = (conArr: ConItemList) => {
		setConItemList(conArr)
		setConMarker(conArr)
	}
	const handleResItemList = (resArr: ResItemList) => {
		setResItemList(resArr)
		setResMarker(resArr)
	}
	const handlePlayItemList = (playArr: PlayItemList) => {
		setPlayItemList(playArr)
		setPlayMarker(playArr)
	}
	const handleSearchResult = (result?: PlaceVO[]) => {
		setSearchResult(result)
		setSearchMarker(result)
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

	const setResMarker = (resItemList?: ResItemList) => {
		if (!resItemList) {
			return
		}
		let tempArr = []
		tempArr.push(resItemList.res1 ? drawConMarker(resItemList.res1) : undefined)
		tempArr.push(resItemList.res2 ? drawConMarker(resItemList.res2) : undefined)
		tempArr.push(resItemList.res3 ? drawConMarker(resItemList.res3) : undefined)
		tempArr.push(resItemList.res4 ? drawConMarker(resItemList.res4) : undefined)
		tempArr.push(resItemList.res5 ? drawConMarker(resItemList.res5) : undefined)
		tempArr.push(resItemList.res6 ? drawConMarker(resItemList.res6) : undefined)
		setResMarkerSetList(tempArr as MarkerItemSet[])
	}

	const setPlayMarker = (playItemList?: PlayItemList) => {
		if (!playItemList) {
			return
		}
		let tempArr = []
		tempArr.push(playItemList.play1 ? drawConMarker(playItemList.play1) : undefined)
		tempArr.push(playItemList.play2 ? drawConMarker(playItemList.play2) : undefined)
		tempArr.push(playItemList.play3 ? drawConMarker(playItemList.play3) : undefined)
		tempArr.push(playItemList.play4 ? drawConMarker(playItemList.play4) : undefined)
		tempArr.push(playItemList.play5 ? drawConMarker(playItemList.play5) : undefined)
		tempArr.push(playItemList.play6 ? drawConMarker(playItemList.play6) : undefined)
		tempArr.push(playItemList.play7 ? drawConMarker(playItemList.play7) : undefined)
		tempArr.push(playItemList.play8 ? drawConMarker(playItemList.play8) : undefined)
		setPlayMarkerSetList(tempArr as MarkerItemSet[])
	}

	const setSearchMarker = (result?: PlaceVO[]) => {
		if (!result) {
			return
		}
		// console.log("마커변환 결과 : ", drawConMarker(result))
		setSearchMarkerSetList(drawConMarker(result))
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

	const winFrameApp = document.getElementById("win_frame_modal")
	const innerFrame = document.getElementById("win_frame")
	const handleCloseWinFrame = () => {
		if (!winFrameApp) {
			return
		}
		if (!innerFrame) {
			return
		}
		winFrameApp.style.display = "none"
		innerFrame.setAttribute('src', "")
		setFrameFadeOut(false)
	}

	window.handleOpenWinFrame = (url:string) => {
		if (!winFrameApp) {
			return
		}
		if (!innerFrame) {
			return
		}
		winFrameApp.style.display = "flex"
		innerFrame.setAttribute('src', url)
	}
	window.handleClusterWindowClose = () => {
		const clusterWindow = document.getElementById("cluster_window")
		if (clusterWindow) {
			clusterWindow.remove()
		}
		const clusterItem = document.getElementById("cluster_item")
		if (clusterItem) {
			clusterItem.remove()
		}
		const topDummyTag = document.getElementById("top_dummy_tag")
		const midDummytag = document.getElementById("mid_dummy_tag")
		if (topDummyTag) {
			topDummyTag.remove()
		}
		if (midDummytag) {
			midDummytag.remove()
		}
	}
	const [clusterItemState, setClusterItemState] = useState<any>(null)
	window.clusterItemView = (position: any, title: string, map: any) => {
		let lat = Number(position.replaceAll('(', '').replaceAll(')', '').split(" ")[0])
		let lng = Number(position.replaceAll('(', '').replaceAll(')', '').split(" ")[1])
		let latlng = new window.kakao.maps.LatLng(lat, lng)
		getPlaceInfoByTitle(latlng, title).then((res) => {
			if (res) {
				const clusterItemWindow = new window.kakao.maps.InfoWindow({
					content: ClusteritemWindow(res[0]),
					position: new window.kakao.maps.LatLng(lat, lng),
				})
				setClusterItemState(clusterItemWindow)
			}
		})
	}
	const getPlaceInfoByTitle = async (position: any ,title: string) => {
		return await FindPlace.findPlace(position, title, 100)
	}
	const [frameFadeOut, setFrameFadeOut] = useState(false)

	return (
		<div id='wrapper' className='map_wrapper'>
			<HeaderBar
				element={
					<img
						src={TitleImg}
						alt="주변을 부탁해!"
						style={{ width: 200, height: 40, objectFit: 'contain', objectPosition: 'center' }}
					/>
				}
			/>
			<main>
				<article className='container'>
					<div className='container_inner'>
						{isLoading ? <ContactDialog handleModalToggle={handleModalToggle} modalFade={modalFade} /> :
						<KakaoMapComponent
							conItemList={conItemList}
							resItemList={resItemList}
							playItemList={playItemList}
							handleConItemList={handleConItemList}
							handleResItemList={handleResItemList}
							handlePlayItemList={handlePlayItemList}
							handleSearchResult={handleSearchResult}
							conMarkerSetList={conMarkerSetList}
							resMarkerSetList={resMarkerSetList}
							playMarkerSetList={playMarkerSetList}
							searchMarkerSetList={searchMarkerSetList}
							handelConLoad={handelConLoad}
							handelResLoad={handelResLoad}
							handelPlayLoad={handelPlayLoad}
							handelSearchLoad={handelSearchLoad}
							conListItem={conListItem}
							resListItem={resListItem}
							playListItem={playListItem}
							searchKeyword={searchKeyword}
							searchRange={searchRange}
							clusterItemState={clusterItemState}
						/>
						}
						<BottomPanel
							isActive={isActive}
							isPanelOpen={isPanelOpen}
							panelHeight={panelHeight}
							dragHandle={dragHandle}
							conItemList={conItemList}
							resItemList={resItemList}
							playItemList={playItemList}
							searchResult={searchResult}
							cateConCheck={cateConCheck}
							cateResCheck={cateResCheck}
							catePlayCheck={catePlayCheck}
							conListItem={conListItem}
							resListItem={resListItem}
							playListItem={playListItem}
							handleConCheck={handleConCheck}
							handleResCheck={handleResCheck}
							handlePlayCheck={handlePlayCheck}
							handleConListChange={handleConListChange}
							handleResListChange={handleResListChange}
							handlePlayListChange={handlePlayListChange}
							searchKeyword={searchKeyword}
							handleKeywordInput={handleKeywordInput}
							searchRange={searchRange}
							handleRangeChange={handleRangeChange}
						/>
					</div>
				</article>
			</main>
			<BottomBar tab={tab} onTabChange={onTabChange} />
			{
				modalVisible && (
				<ContactDialog handleModalToggle={handleModalToggle} modalFade={modalFade} />
				)
			}
			<WinFrameDialog handleCloseWinFrame={handleCloseWinFrame} frameFadeOut={frameFadeOut} setFrameFadeOut={setFrameFadeOut} />
		</div>
	);
}

export default App;
