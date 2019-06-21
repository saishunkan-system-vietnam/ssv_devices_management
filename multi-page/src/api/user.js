import _config from 'config';

function ShowUser(user_id) {
    const url = _config.apiUrl + _config.apiEndpoint.show_user + user_id;
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