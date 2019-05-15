import constants from '../contants';

function signin(params) {
    const url = constants.Url + '/api/v1/user/login';
   return   fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            username: params.username,
            passwd: params.passwd
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