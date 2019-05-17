import constants from '../constants/contants';

function AuthServer(params) {
    const url = constants.Url + constants.endpoint.auth;
   return   fetch(url, {
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