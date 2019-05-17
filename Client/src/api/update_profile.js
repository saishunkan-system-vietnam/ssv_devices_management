import constants from '../constants/contants';

function UpdateProfile(params) {
    const url = constants.Url + '/api/v1/user/profile';
   return   fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            user_name: params.inputName,
            full_name: params.inputFullName,
            email: params.inputEmail,
            address: params.inputAddress,
            dateofbirth: params.inputDOB,
            joindate: params.inputJoinDate,
        })
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
}

export default {
    UpdateProfile: UpdateProfile
}