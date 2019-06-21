import _config from 'config';

function signin(params) {
    const url = _config.apiUrl + _config.apiEndpoint.login;
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            username: params.username,
            password: params.password
        })
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
}

export default {
    signin: signin
}