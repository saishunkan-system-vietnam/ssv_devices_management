import React from 'react';
export function status(status) {
    let staust_name = '';
    if (status === 0) {
        staust_name = <span className="label label-primary">Free time</span>;
    } else if (status === 1) {
        staust_name = <span className="label label-success">Busy</span>;
    } else if (status === 2) {
        staust_name = <span className="label label-default">Is maintenancing</span>;
    }
    return (
        <React.Fragment>
            {staust_name}
        </React.Fragment>
    )
}