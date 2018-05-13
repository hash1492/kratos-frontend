import axios from 'axios'
import constants from './../../constants'
import Storage from './../storage/storage.service'

let apiService = {
    
    get(url) {
        let config = {
            headers: {
                'Authorization': Storage.get('token')
            }
        };
        return axios.get(constants.REST_BASE_URL + url, config);
    },

    post(url, payload) {
        let config = {
            headers: {
                'Authorization': Storage.get('token')
            }
        };
        return axios.post(constants.REST_BASE_URL + url, payload, config);
    }
}

export default apiService;
