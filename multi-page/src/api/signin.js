import constants from '../constants/contants';

function signin(params) {
    const url = constants.Url + constants.endpoint.login;
   return   fetch(url, {
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