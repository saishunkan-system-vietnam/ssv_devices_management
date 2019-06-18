import constants from '../constants/contants';
import axios from 'axios';

function MaintenancesAdd(formData) {
    const url = constants.Url + constants.endpoint.maintenance_add;
    let token = localStorage.getItem('Token') || '';
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
        }
    }
    return axios.post(url, formData, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export default {
    MaintenancesAdd
}