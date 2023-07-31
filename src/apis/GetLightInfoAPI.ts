import axios from 'axios'
import LightInfoVO from '../components/models/LightInfoVO'

/**
 * 신호등 정보 로드 API
 * @returns 신호등 정보
 */
const getLightInfoJson = () => {
    return axios.get('/data/LIGHT_INFO.json')
    .then((res) => res.data as LightInfoVO[])
}

const GetLightInfoAPI = {
    getLightInfoJson,
}

export default GetLightInfoAPI