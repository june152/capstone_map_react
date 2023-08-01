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
                if (!(conArray && pubInfo && resArray && playArray && bclArray)) {
                    setContentText("지도를 클릭해주세요.")
                } else {
                    let str = "주변에 CCTV가 " + bclArray[1] + "개 있습니다\n" +
                    "주변에 편의점이 " + conArray[0][1] + "개, " +
                    "마트가 " + conArray[1][1] + "개 있습니다\n" +
                    "세탁소가 " + conArray[2][1] + "개 있습니다\n" +
                    "미용실이 " + conArray[3][1] + "개 있습니다\n" +
                    "스터디카페가 " + conArray[4][1] + "개 있습니다\n" +
                    "은행/ATM이 " + conArray[5][1] + "개 있습니다\n" +
                    "병원이 " + conArray[6][1] + "개, " +
                    "약국이 " + conArray[7][1] + "개\n" +
                    "헬스장이 " + conArray[8][1] + "개 있습니다"
                    setContentText(str)
                }
                break
            case 1:
                setComment("안전은 주변의 CCTV와 술집을 고려한 점수입니다.\n가까운 곳에 술집이 있으면 점수가 내려갑니다.")
                if (!(conArray && pubInfo && resArray && playArray && bclArray)) {
                    setContentText("지도를 클릭해주세요.")
                } else {
                    let str = "주변에 CCTV가 " + bclArray[1] + "개 있습니다\n" +
                    "보안등이 " + (bclArray.length-bclArray[0]-bclArray[1]-2) + "개 있습니다\n" +
                    "너무 가까운 술집이 " + pubInfo[1] + "개 있습니다"
                    setContentText(str)
                }
                break
            case 2:
                setComment("먹거리는 주변의 음식점들을 고려한 점수입니다.")
                if (!(conArray && pubInfo && resArray && playArray && bclArray)) {
                    setContentText("지도를 클릭해주세요.")
                } else {
                    let str = "주변에 CCTV가 " + bclArray[1] + "개 있습니다\n" +
                    "주변에 한식점이 " + resArray[0][1] + "개, " +
                    "양식점은 " + resArray[1][1] + "개\n" +
                    "중식점은 " + resArray[2][1] + "개, " +
                    "일식점은 " + resArray[3][1] + "개\n" +
                    "분식점은 " + resArray[4][1] + "개, " +
                    "패스트푸드점은 " + resArray[5][1] + "개 있습니다"
                    setContentText(str)
                }
                break
            case 3:
                setComment("교통성은 주변의 버스 정류장을 고려한 점수입니다.")
                if (!(conArray && pubInfo && resArray && playArray && bclArray)) {
                    setContentText("지도를 클릭해주세요.")
                } else {
                    let str = "주변에 버스 정류장이 " + bclArray[0] + "개 있습니다"
                    setContentText(str)
                }
                break
            case 4:
                setComment("놀거리는 주변의 PC방, 영화관, 노래방 등의\n여가시설을 고려한 점수입니다.")
                if (!(conArray && pubInfo && resArray && playArray && bclArray)) {
                    setContentText("지도를 클릭해주세요.")
                } else {
                    let str = 
                    "주변에 PC방이 " + playArray[0][1] + "개, " +
                    "오락실이 " + playArray[1][1] + "개 있습니다\n" +
                    "만화 카페는 " + playArray[2][1] + "개 있습니다\n" +
                    "노래방은 " + playArray[3][1] + "개 있습니다\n" +
                    "영화관은 " + playArray[4][1] + "개 있습니다\n" +
                    "술집은 " + (playArray[5][1] + + playArray[6][1] + playArray[7][1]) + "개 있습니다\n"
                    setContentText(str)
                }
                break
            default:
                setComment("")
                setContentText("")
                break
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