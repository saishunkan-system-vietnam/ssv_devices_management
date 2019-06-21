import _config from 'config';

function MaintenanceView(id) {
    const url = _config.apiUrl + _config.apiEndpoint.maintenance_view + id;
    let token = localStorage.getItem('Token') || '';
    return fetch(url, {
        method: 'GET',
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
    MaintenanceView
}