import _config from 'config';

function AuthServer(params) {
    const url = _config.apiUrl + _config.apiEndpoint.auth;
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            user_name: params.inputName,
        })
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
}

export default {
    AuthServer: AuthServer
}