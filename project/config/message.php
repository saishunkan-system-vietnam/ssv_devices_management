<?php

use Cake\Core\Configure;

return [
    'Message' => [
        'add_success' => 'Thêm %s thành công.',
        'edit_success' => "Cập nhập %s thành công.",
        'delete_success' => "Xóa %s thành công.",
        'add_error' => 'Thêm %s thất bại.',
        'edit_error' => "Cập nhập %s thất bại.",
        'delete_error' => "Xóa %s thất bại.",
        'method_error' => "Phương thức không hợp lệ.",
        'no_data' => "Không tìm thấy dữ liệu. Vui lòng kiểm tra lại",
        'no_id' => "Không tìm thấy ID. Vui lòng thử lại",
        'no_img' => "Để tiếp tục vui lòng chọn ảnh.",
        'img_large' => "Không thể tải ảnh quá lớn.",
        'img_invaild' => "Chọn đúng định dạng ảnh: %s",
    ],
    'Borrow' => [
        'approve_success' => 'Phê duyệt yêu cầu mượn đồ thành công',
        'noApprove_success' => 'Không chấp nhận yêu cầu mượn đồ thành công',
        'returnDevice_success' => 'Đã gửi yêu cầu trả đồ.',
        'confirmReturnDevice_success' => 'Đã xác nhận trả đồ.',
        'approve_error' => 'Phê duyệt yêu cầu mượn đồ không thành công. Vui lòng kiểm tra lại.',
        'noApprove_error' => 'Không chấp nhận yêu cầu mượn đồ không thành công. Vui lòng kiểm tra lại',
        'returnDevice_error' => 'Yêu cầu trả đồ không thành công. Vui lòng kiểm tra lại.',
        'confirmReturnDevice_error' => 'Xác nhận trả đồ không thành công. Vui lòng kiểm tra lại',
        'borrowed' => "Thiết bị đã được cho mượn. Vui lòng chọn thiết bị khác",
    ],
     'Maintenance' => [
        'notificationBroken_success' => 'Gửi thông báo hỏng thiết bị thành công',
        'notificationBrokened_error' => 'Thông báo đã được gửi. Vui lòng không gửi lại',
        'comfirmNotificationBroken_success' => 'Thông báo hỏng thiết bị đã được xác nhận',
        'comfirmNotificationBroken_error' => 'Thông báo hỏng thiết bị xác nhận không thành công. Vui lòng kiểm tra lại.',
        'noComfirmNotificationBroken_success' => 'Thông báo hỏng thiết bị đã được hủy',
        'noComfirmNotificationBroken_error' => 'Hủy thông báo hỏng thiết bị không thành công. Vui lòng kiểm tra lại.',

    ]
];
