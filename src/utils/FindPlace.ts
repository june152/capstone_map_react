import PlaceVO from "../components/models/PlaceVO"

namespace FindPlace {
    /**
     * 카카오맵 장소 구하는 유틸
     */

    export const findPlace = (latlng:any, keyword:string, r: number):Promise<PlaceVO[] | undefined> => {
        return new Promise<any>((resolve) => {
            let places = new window.kakao.maps.services.Places()

            const callback = (result:any, status:string, pagination:any) => {
                if(status === 'ZERO_RESULT') resolve(undefined)
                if (status === window.kakao.maps.services.Status.OK) {

                    if (pagination.hasNextPage) pagination.nextPage()
                    resolve(result)
                }
            }
            places.keywordSearch(keyword, callback, { location : latlng, radius : r, sort : window.kakao.maps.services.SortBy.DISTANCE});
            // delete places;

        })
    }

}

export default FindPlace