import axios from 'axios'
import CCTVInfoVO from '../components/models/CCTVInfoVO'

/**
 * CCTV 정보 로드 API
 * @returns CCTV 정보
 */
const getCCTVInfoJson = () => {
    return axios.get('/data/CCTV_INFO.json')
    .then((res) => res.data as CCTVInfoVO[])
}

const GetCCTVInfoAPI = {
    getCCTVInfoJson,
}

export default GetCCTVInfoAPI