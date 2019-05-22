import constants from '../constants/contants';

function ShowUser(user_id) {
    const url = constants.Url + constants.endpoint.show_user + user_id;
    let token = localStorage.getItem('Token') || '';
    return fetch(url, {
        method: 'GET',
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
    ShowUser: ShowUser
}