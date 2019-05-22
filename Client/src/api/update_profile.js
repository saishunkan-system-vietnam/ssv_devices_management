import constants from '../constants/contants';

function UpdateProfile(params) {
    const url = constants.Url + constants.endpoint.update_profile;
    let token = localStorage.getItem('Token') || '';
   return   fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },

        body: JSON.stringify({
            id : params.inputId,
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