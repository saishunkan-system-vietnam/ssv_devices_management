import constants from '../constants/contants';
import axios from 'axios';

function MaintenanceConfirmNotification(formData) {
    const url = constants.Url + constants.endpoint.maintenance_comfirm_notification_broken;
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
    MaintenanceConfirmNotification
}