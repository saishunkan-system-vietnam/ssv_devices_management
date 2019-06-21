import _config from 'config';

function LstUsers() {
    const url = _config.apiUrl + _config.apiEndpoint.lstusers;
    //get data local Storage
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imh1bmdodEBzYWlzeXN0ZW0udm4iLCJuYW1lIjoiSHVuZ0hUIn0.g-VMUtNtB7rYrLzQi0Bl8Cys21GHQXlY4tPJw4OC9YQ";

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