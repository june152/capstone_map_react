import React, { ReactElement, useEffect, useState } from 'react';
import ConMarker from '../../assets/mk_10.png'
import ResMarker from '../../assets/mk_1.png'
import PlayMarker from '../../assets/mk_6.png'

interface FilterDialogProps {
    handleModalToggle: Function,
    modalFade: boolean,
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

const FilterDialog = (
    {
        handleModalToggle,
        modalFade,
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
    :FilterDialogProps) => {
    const conList = ["편의점", "마트", "세탁소", "미용실", "스터디카페", "은행", "병원", "약국", "헬스장"]
	const resList = ["한식", "양식", "중식", "일식", "분식", "패스트푸드"]
    const playList = ["PC방", "오락실", "만화카페", "노래방", "영화관", "호프", "이자카야", "칵테일바"]
    const [fadeOut, setFadeOut] = useState(false)
    useEffect(() => {
        if (modalFade) {
            handleCloseModal()
        }
    }, [modalFade])

    const handleCloseModal = () => {
        setFadeOut(true)
        setTimeout(() => handleModalToggle(false), 300)
    }

    useEffect(() => {
        if (cateConCheck) {
            handleConListChange([true, true, true, true, true, true, true, true, true])
        }
        if (cateResCheck) {
            handleResListChange([true, true, true, true, true, true])
        }
        if (catePlayCheck) {
            handlePlayListChange([true, true, true, true, true, true, true, true])
        }
    }, [cateConCheck, cateResCheck, catePlayCheck])

    useEffect(() => {
        for (let i = 0; i < conListItem.length; i++) {
            if (!conListItem[i]) {
                handleConCheck(false)
                break
            }
            handleConCheck(true)
        }
        for (let i = 0; i < resListItem.length; i++) {
            if (!resListItem[i]) {
                handleResCheck(false)
                break
            }
            handleResCheck(true)
        }
        for (let i = 0; i < playListItem.length; i++) {
            if (!playListItem[i]) {
                handlePlayCheck(false)
                break
            }
            handlePlayCheck(true)
        }
    }, [conListItem, resListItem, playListItem])

    const handleItemCheck = (cate: string, idx: number) => {
        switch (cate) {
            case "con":
                let conTempArr = conListItem
                conTempArr[idx] = !conTempArr[idx]
                handleConListChange([...conTempArr])
                break;
            case "res":
                let resTempArr = resListItem
                resTempArr[idx] = !resTempArr[idx]
                handleResListChange([...resTempArr])
                break;
            case "play":
                let playTempArr = playListItem
                playTempArr[idx] = !playTempArr[idx]
                handlePlayListChange([...playTempArr])
                break;
            default:
                return
        }
    }
    
    return (
        <div className={`modal ${fadeOut ? "fade-out" : ""}`} id="estimateModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-backdrop"></div>
            <div className="modal-dialog">
                <div
                    className="filter_popup"
                    style={{ display:"flex" }}
                >
                    <div className="white_box">
                        <form>
                            <div className="popup_top">
                                <div className="popup_tit">
                                    <h3>검색필터 상세</h3>
                                    <a className="filter_popup_close"
                                        onClick={() => {handleCloseModal()}}
                                    ></a>
                                </div>
                                <div className="popup_con">
                                    <div className="category2">
                                        <p>카테고리</p>
                                        <ul>
                                            <li className='big'>
                                                <p>
                                                    <input
                                                        type="checkbox"
                                                        id="check01-1"
                                                        checked={cateConCheck}
                                                        onChange={() => {
                                                            if (cateConCheck) {
                                                                handleConListChange([false, false, false, false, false, false, false, false, false])
                                                            }
                                                            handleConCheck(!cateConCheck)
                                                        }}
                                                    />
                                                    <label htmlFor="check01-1">
                                                        <img
                                                            src={ConMarker}
                                                            alt="편의"
                                                        />
                                                        편의시설
                                                    </label>
                                                </p>
                                            </li>
                                            <div>
                                                {conList.map((con, idx) => (
                                                    <p key={idx}>
                                                        <input
                                                            type="checkbox"
                                                            id={`check01-${idx + 2}`}
                                                            checked={conListItem[idx]}
                                                            onChange={() => {
                                                                handleItemCheck("con", idx)
                                                            }}
                                                        />
                                                        <label htmlFor={`check01-${idx+2}`}>
                                                            {con}
                                                        </label>
                                                    </p>
                                                ))}
                                            </div>
                                            <li className='big'>
                                                <p>
                                                    <input
                                                        type="checkbox"
                                                        id="check02-1"
                                                        checked={cateResCheck}
                                                        onChange={() => {
                                                            if (cateResCheck) {
                                                                handleResListChange([false, false, false, false, false, false])
                                                            }
                                                            handleResCheck(!cateResCheck)
                                                        }}
                                                    />
                                                    <label htmlFor="check02-1">
                                                        <img
                                                            src={ResMarker}
                                                            alt="음식점"
                                                        />
                                                        음식점
                                                    </label>
                                                </p>
                                            </li>
                                            <div>
                                                {resList.map((res, idx) => (
                                                    <p key={idx}>
                                                        <input
                                                            type="checkbox"
                                                            id={`check02-${idx + 2}`}
                                                            checked={resListItem[idx]}
                                                            onChange={() => {
                                                                handleItemCheck("res", idx)
                                                            }}
                                                        />
                                                        <label htmlFor={`check02-${idx+2}`}>
                                                            {res}
                                                        </label>
                                                    </p>
                                                ))}
                                            </div>
                                            <li className='big'>
                                                <p>
                                                    <input
                                                        type="checkbox"
                                                        id="check03-1"
                                                        checked={catePlayCheck}
                                                        onChange={() => {
                                                            if (catePlayCheck) {
                                                                handlePlayListChange([false, false, false, false, false, false, false, false])
                                                            }
                                                            handlePlayCheck(!catePlayCheck)
                                                        }}
                                                    />
                                                    <label htmlFor="check03-1">
                                                        <img
                                                            src={PlayMarker}
                                                            alt="오락시설"
                                                        />
                                                        오락시설
                                                    </label>
                                                </p>
                                            </li>
                                            <div>
                                                {playList.map((play, idx) => (
                                                    <p key={idx}>
                                                        <input
                                                            type="checkbox"
                                                            id={`check03-${idx + 2}`}
                                                            checked={playListItem[idx]}
                                                            onChange={() => {
                                                                handleItemCheck("play", idx)
                                                            }}
                                                        />
                                                        <label htmlFor={`check03-${idx+2}`}>
                                                            {play}
                                                        </label>
                                                    </p>
                                                ))}
                                            </div>
                                        </ul>
                                    </div>
                                    <div className="keyword">
                                        <p>검색어</p>
                                        <input
                                            type="text"
                                            placeholder="검색어를 입력해주세요"
                                            value={searchKeyword}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                handleKeywordInput(e.target.value)
                                            }}
                                        />
                                        <p>검색 범위 {`(${searchRange})`}</p>
                                        <input
                                            type='range'
                                            value={searchRange}
                                            min={100}
                                            max={500}
                                            step={1}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                handleRangeChange(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterDialog;