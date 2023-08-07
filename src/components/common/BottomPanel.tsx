import React, { useEffect, useState } from 'react';
import { ConItemList } from '../models/ConItemList';
import { ResItemList } from '../models/ResItemList';
import { PlayItemList } from '../models/PlayItemList';
import PlaceVO from '../models/PlaceVO';
import FilterDialog from '../BottomPanelComponent/FilterDialog';

interface BottomPanelProps {
    isActive: boolean,
    isPanelOpen: boolean,
    panelHeight: number,
    dragHandle: React.RefObject<HTMLDivElement>,
    conItemList?: ConItemList,
    resItemList?: ResItemList,
    playItemList?: PlayItemList,
    searchResult?: PlaceVO[],
    cateConCheck: boolean,
    cateResCheck: boolean,
    catePlayCheck: boolean,
    conListItem: boolean[],
    resListItem: boolean[],
    playListItem: boolean[],
    handleConCheck: Function,
    handleResCheck: Function,
    handlePlayCheck: Function,
    handleConListChange: Function,
    handleResListChange: Function,
    handlePlayListChange: Function,
    searchKeyword: string,
    handleKeywordInput: Function,
    searchRange: number,
    handleRangeChange: Function,
}

const BottomPanel = (
    {
        isActive,
        isPanelOpen,
        panelHeight,
        dragHandle,
        conItemList,
        resItemList,
        playItemList,
        searchResult,
        cateConCheck,
        cateResCheck,
        catePlayCheck,
        conListItem,
        resListItem,
        playListItem,
        handleConCheck,
        handleResCheck,
        handlePlayCheck,
        handleConListChange,
        handleResListChange,
        handlePlayListChange,
        searchKeyword,
        handleKeywordInput,
        searchRange,
        handleRangeChange,
    }
    :BottomPanelProps
) => {
    //로딩창 모달
	const [modalVisible, setModalVisible] = useState(false)
	const [modalFade, setModalFade] = useState(false)
	const handleModalToggle = (isVisible : boolean) => {
		setModalVisible(isVisible)
		setModalFade(false)
    }

    //전체 장소 리스트
    const [allPlaceList, setAllPlaceList] = useState([] as PlaceVO[])

    useEffect(() => {
        let tempArr: PlaceVO[] = []
        if (searchResult) {
            searchResult.map((result) => {
                tempArr.push(result)
            })
        }
        if (conItemList) {
            if (conItemList.con1) {
                conItemList.con1.map((con) => {
                    tempArr.push(con)
                })
            }
            if (conItemList.con2) {
                conItemList.con2.map((con) => {
                    tempArr.push(con)
                })
            }
            if (conItemList.con3) {
                conItemList.con3.map((con) => {
                    tempArr.push(con)
                })
            }
            if (conItemList.con4) {
                conItemList.con4.map((con) => {
                    tempArr.push(con)
                })
            }
            if (conItemList.con5) {
                conItemList.con5.map((con) => {
                    tempArr.push(con)
                })
            }
            if (conItemList.con6) {
                conItemList.con6.map((con) => {
                    tempArr.push(con)
                })
            }
            if (conItemList.con7) {
                conItemList.con7.map((con) => {
                    tempArr.push(con)
                })
            }
            if (conItemList.con8) {
                conItemList.con8.map((con) => {
                    tempArr.push(con)
                })
            }
            if (conItemList.con9) {
                conItemList.con9.map((con) => {
                    tempArr.push(con)
                })
            }
        }
        if (resItemList) {
            if (resItemList.res1) {
                resItemList.res1.map((res) => {
                    tempArr.push(res)
                })
            }
            if (resItemList.res2) {
                resItemList.res2.map((res) => {
                    tempArr.push(res)
                })
            }
            if (resItemList.res3) {
                resItemList.res3.map((res) => {
                    tempArr.push(res)
                })
            }
            if (resItemList.res4) {
                resItemList.res4.map((res) => {
                    tempArr.push(res)
                })
            }
            if (resItemList.res5) {
                resItemList.res5.map((res) => {
                    tempArr.push(res)
                })
            }
            if (resItemList.res6) {
                resItemList.res6.map((res) => {
                    tempArr.push(res)
                })
            }
        }
        if (playItemList) {
            if (playItemList.play1) {
                playItemList.play1.map((play) => {
                    tempArr.push(play)
                })
            }
            if (playItemList.play2) {
                playItemList.play2.map((play) => {
                    tempArr.push(play)
                })
            }
            if (playItemList.play3) {
                playItemList.play3.map((play) => {
                    tempArr.push(play)
                })
            }
            if (playItemList.play4) {
                playItemList.play4.map((play) => {
                    tempArr.push(play)
                })
            }
            if (playItemList.play5) {
                playItemList.play5.map((play) => {
                    tempArr.push(play)
                })
            }
            if (playItemList.play6) {
                playItemList.play6.map((play) => {
                    tempArr.push(play)
                })
            }
            if (playItemList.play7) {
                playItemList.play7.map((play) => {
                    tempArr.push(play)
                })
            }
            if (playItemList.play8) {
                playItemList.play8.map((play) => {
                    tempArr.push(play)
                })
            }
        }
        setAllPlaceList(tempArr)

    }, [conItemList, resItemList, playItemList, searchResult])

    return (
        <div className='mobile_menu_inner'>
            <div className={`Panel js-panel is-draggable ${isActive ? "is-active" : isPanelOpen ? "is-open" : "is-closed"}`}
                style={{top: isActive ? panelHeight : ""}}
            >
                <div className="mobile_title_box">
                    <div className="Panel-toggle js-draggable"
                        ref={dragHandle}
                    ></div>
                    <div className="toggle_bottom">
                        <a className="btn_filter" onClick={() => {handleModalToggle(true)}}>검색</a>
                        <p>목록 <b>{allPlaceList.length}</b>개</p>
                    </div>
                </div>
                <div className="mobile_content_box">
                    <div className="list">
                        {allPlaceList.length > 0 ?
                            allPlaceList.map((place) => (
                            <ul>
                                <li>
                                    <a>
                                        <div className="list_table noimg">
                                            <div className="txt">
                                                <h5 className="txt_cut1" onClick={(e: React.MouseEvent<HTMLHeadElement>) => {
                                                    e.preventDefault()
                                                    window.handleOpenWinFrame(place.place_url)
                                                }
                                                }>{place.place_name}</h5>
                                                <p className="address">{`(도로명) ${place.road_address_name}`}</p>
                                                <p className="address">{`(지번) ${place.address_name}`}</p>
                                                <p className="tel">{place.phone === "" ? "연락처 없음" : place.phone}</p>
                                                <p className="tag"><span>{place.category_name}</span></p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            ))
                            :
                            <ul>
                                <li>
                                    <a>
                                        <div className="list_table noimg">
                                            <div className="txt">
                                                <h5 className="txt_cut1">검색목록이 없습니다.</h5>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
            {modalVisible && (
                <FilterDialog
                    handleModalToggle={handleModalToggle}
                    modalFade={modalFade}
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
            )}
            
        </div>
    );
};

export default BottomPanel;