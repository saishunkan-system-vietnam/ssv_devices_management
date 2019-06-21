import _config from 'config';
import axios from 'axios';

function BorrowFilter(formData) {
    const url = _config.apiUrl + _config.apiEndpoint.filter_borrow;
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
    BorrowFilter
}