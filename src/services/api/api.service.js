import axios from 'axios'
import constants from './../../constants'

let apiService = {
    
    get(url) {
        return axios.get(constants.REST_BASE_URL + url);
    },

    post(url, payload) {
        return axios.post(constants.REST_BASE_URL + url, payload);
    }
}

export default apiService;
