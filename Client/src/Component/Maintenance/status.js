import React from 'react';
export function status(status) {
    var _status = '';
    switch (status) {
        case 0: _status = <span className="label label-primary">Notification broken</span>;
            break;
        case 1: _status = <span className="label label-success">Waiting for repair</span>;
            break;
        case 2: _status = <span className="label label-default">Repairing</span>;
            break;
        case 3: _status = <span className="label label-warning">Repaired</span>;
            break;
        case 4: _status = <span className="label label-danger ">Repair fail</span>;
            break;
        case 5: _status = <span className="label label-info ">No confirm notification</span>;
            break;
        default: _status = ""
            break;
    }
    return _status;
}






