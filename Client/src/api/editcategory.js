import constants from '../constants/contants';
import axios from 'axios';

function editCategory(formData) {
    const url = constants.Url + constants.endpoint.add_category;
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
    editCategory
}