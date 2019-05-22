import constants from '../constants/contants';

function delete_user(user_id) {
    const url = constants.Url + constants.endpoint.delete_user;
    let token = localStorage.getItem('Token') || '';
   return   fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },

        body: JSON.stringify({
            id: user_id
        })
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
}

export default {
    delete_user: delete_user
}