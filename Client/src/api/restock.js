import constants from '../constants/contants';

function restock(user_id) {
    const url = constants.Url + constants.endpoint.restock_user;
   return   fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
    restock: restock
}