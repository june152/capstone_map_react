import axios from 'axios'
import BusStopVO from '../components/models/BusStopVO'

/**
 * 버스정류장 정보 로드 API
 * @return 버스정류장 정보
 */
interface GetAllParams {
    ServiceKey?: string,
}

const getBusInfo = (params: GetAllParams) => {
    return axios.get("http://api.gwangju.go.kr/json/stationInfo", { params })
    .then((res) => res.data)
}

const getBusInfoJson = () => {
    return axios.get('/data/BUSSTOP_INFO.json')
    .then((res) => res.data as BusStopVO[])
}

const GetBusInfoAPI = {
    getBusInfo,
    getBusInfoJson,
}

export default GetBusInfoAPI