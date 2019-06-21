import _config from 'config';

function LstBorrow() {
    const url = _config.apiUrl + _config.apiEndpoint.list_borrow;
    //get data local Storage
    let token = localStorage.getItem('Token') || '';

    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },

    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
}

export default {
    LstBorrow
}