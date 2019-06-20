import _config from 'config';
import axios from 'axios';

function BrandsAdd(formData) {
    const url = _config.apiUrl + _config.apiEndpoint.brand_add;
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
    BrandsAdd
}