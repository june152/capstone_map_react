import React, { ReactElement, useEffect, useState } from 'react';

interface WinFrameDialogProps {
    handleCloseWinFrame: Function,
    frameFadeOut: boolean,
    setFrameFadeOut: Function,
}

const WinFrameDialog = (
    {
        handleCloseWinFrame,
        frameFadeOut,
        setFrameFadeOut,
    }
    : WinFrameDialogProps) => {

    const handleCloseModal = () => {
        setFrameFadeOut(true)
        setTimeout(() => {
            handleCloseWinFrame()
        }, 300)
    }
    
    return (
        <div className={`modal ${frameFadeOut ? "fade-out" : ""}`} id="win_frame_modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
            style={{display: "none"}}
        >
            <div className="modal-backdrop"></div>
            <div className="modal-dialog">
                <div
                    className="filter_popup"
                    style={{ display:"flex" }}
                >
                    <div className="white_box2">
                        <form>
                            <div className="popup_top2">
                                <div className="popup_tit2">
                                    <h3><b>장소 상세</b></h3>
                                    <a className="filter_popup_close"
                                        onClick={() => {handleCloseModal()}}
                                    ></a>
                                </div>
                                <div className="popup_con2">
                                    <iframe id="win_frame" src='http://place.map.kakao.com/10007451'>
                                    </iframe>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinFrameDialog;