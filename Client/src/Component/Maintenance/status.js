import React from 'react';
export function status(status) {
    var _status = '';
    switch (status) {
        case 0: _status = <span className="label label-primary">Thông báo hỏng</span>;
            break;
        case 1: _status = <span className="label label-success">Đang đợi bảo trì</span>;
            break;
        case 2: _status = <span className="label label-default">Đang bảo trì</span>;
            break;
        case 3: _status = <span className="label label-warning">Bảo trì thành công</span>;
            break;
        case 4: _status = <span className="label label-danger ">Bảo trì thất bại</span>;
            break;
        case 5: _status = <span className="label label-info ">Thông báo hỏng bị hủy</span>;
            break;
        default: _status = ""
            break;
    }
    return _status;
}






