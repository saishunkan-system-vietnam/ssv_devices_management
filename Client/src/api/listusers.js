import constants from '../constants/contants';

function LstUsers() {
    const url = constants.Url + constants.endpoint.lstusers;
   return   fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
}

export default {
    LstUsers: LstUsers
}