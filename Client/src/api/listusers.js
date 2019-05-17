import constants from '../constants/contants';
import React from "react";

function LstUsers() {
    const url = constants.Url + constants.endpoint.lstusers;
    //get data local Storage
    let token = localStorage.getItem('Token') || '';
    console.log(token);

    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
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