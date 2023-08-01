import React, { useEffect, useState } from 'react';

interface ConComponentProps {
    contentNumber?: number,
    handleInitInfo: Function,
    conArray?: any[],
    pubInfo?: any,
    resArray?: any[],
    playArray?: any[],
    bclArray?: any[],
}

const ConComponent = ({ contentNumber, handleInitInfo, conArray, pubInfo, resArray, playArray, bclArray }: ConComponentProps) => {
    const [comment, setComment] = useState("")
    const [contentText, setContentText] = useState("")
    useEffect(() => {
        switch (contentNumber) {
            case 0:
                setComment("편의는 주변의 생활 서비스 관련 가게들을 고려한 점수입니다.")
                break
            case 1:
                setComment("안전은 주변의 CCTV와 술집을 고려한 점수입니다.\n가까운 곳에 술집이 있으면 점수가 내려갑니다.")
                if (!bclArray) {
                    setContentText("지도를 클릭해주세요.")
                } else {

                }
                break
            case 2:
                setComment("먹거리는 주변의 음식점들을 고려한 점수입니다.")
                if (!resArray) {
                    setContentText("지도를 클릭해주세요.")
                } else {

                }
                break
            case 3:
                setComment("교통성은 주변의 버스 정류장을 고려한 점수입니다.")
                if (!bclArray) {
                    setContentText("지도를 클릭해주세요.")
                } else {

                }
                break
            case 4:
                setComment("놀거리는 주변의 PC방, 영화관, 노래방 등의\n여가시설을 고려한 점수입니다.")
                if (!playArray) {
                    setContentText("지도를 클릭해주세요.")
                } else {

                }
                break
            default:
                setComment("")
                setContentText("")
                break
        }
        if (!(conArray && pubInfo && resArray && playArray && bclArray)) {
            setContentText("지도를 클릭해주세요.")
        } else {
            let str = "주변에 CCTV가 " + bclArray[1] + "개 있습니다\n" +
            "보안등이 " + (bclArray.length-bclArray[0]-bclArray[1]-2) + "개 있습니다\n" +
            "너무 가까운 술집이 " + pubInfo[1] + "개 있습니다"
            setContentText(str)
        }
    }, [contentNumber, conArray, pubInfo, resArray, playArray, bclArray])

    

    return (
        <div id="infobox" onClick={() => handleInitInfo()}>
            <p id="info_p">{comment}</p>
            <p id="count_p">{contentText}</p>
        </div>
    );
};

export default ConComponent;