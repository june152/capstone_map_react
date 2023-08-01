namespace FindPlace {
    /**
     * 카카오맵 장소 구하는 유틸
     */

    export const findPlace = (latlng:any, keyword:string, r: number, threshold: number, coef: number, coef_a:any, coefCountPlus: Function):Promise<any> => {
        return new Promise<any>((resolve) => {
            let places = new window.kakao.maps.services.Places()
            let score = [] as number[]
            let near_point = coef / threshold
            score[0] = 0
            score[1] = 0
            console.log("keyword : ", keyword)
            console.log("coef_a : ", coef_a)
            coef_a /= 100
            near_point *= coef_a
            coef *= coef_a
            console.log("coef : ", coef)

            const callback = (result:any, status:string, pagination:any) => {
                if(status === 'ZERO_RESULT') resolve(score)
                if (status === window.kakao.maps.services.Status.OK) {
                    console.log(keyword, "계수 배수 : ", coef_a, "near_point : ", near_point, "coef : ", coef)

                    for (const key of result) {
                        if (key.distance <= threshold) {
                            score[0] += near_point
                        } else {
                            score[0] += (coef/key.distance)
                        }
                        score[1]++
                    }

                    if (pagination.hasNextPage) pagination.nextPage()
                    console.log(keyword,"점수 : ", score[0])
                    resolve(score)
                }
            }
            coefCountPlus()
            places.keywordSearch(keyword, callback, { location : latlng, radius : r, sort : window.kakao.maps.services.SortBy.DISTANCE});
            // delete places;

        })
    }

}

export default FindPlace