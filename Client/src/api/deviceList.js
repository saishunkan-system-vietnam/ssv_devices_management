import constants from '../constants/contants';

function LstDevice() {
    const url = constants.Url + constants.endpoint.list_device;
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
    LstDevice
}