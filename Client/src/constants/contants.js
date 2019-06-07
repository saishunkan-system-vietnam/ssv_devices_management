
let api = {
    "Url": "http://localhost",
    'endpoint': {
        'auth': '/auth/signin',
        'login': '/api/v1/user/login',
        'update_profile': '/api/v1/user/profile',
        'lstusers': '/api/v1/user',
        'show_user': '/api/v1/user/show/',
        'restock_user': '/api/v1/user/restock',
        'delete_user': '/api/v1/user/delete',

        'list_category': '/api/v1/category',
        'add_category': '/api/v1/category/add',
        'edit_category': '/api/v1/category/edit',
        'get_category': '/api/v1/category/view/',
        'delete_category': '/api/v1/category/delete/',
        'filter_category': '/api/v1/category/filter',
        'list_brands': '/api/v1/brand',
        'list_borrow': '/api/v1/borrow',
        'view_borrow': '/api/v1/borrow/view/',
        'add_borrow': '/api/v1/borrow/add',
        'edit_borrow': '/api/v1/borrow/edit',
        'delete_borrow': '/api/v1/borrow/delete',
        'approve_borrow': '/api/v1/borrow/approve',
        'no_approve_borrow': '/api/v1/borrow/noapprove',
        'return_borrow': '/api/v1/borrow/returndevice',
        'return_confirm_borrow': '/api/v1/borrow/confirmreturndevice',
        'filter_borrow': '/api/v1/borrow/filter',
        'notification_broken': '/api/v1/maintenance/notification_broken', 

        'brand_list': '/api/v1/brand',
        'brand_view': '/api/v1/brand/view/',
        'brand_add': '/api/v1/brand/add',
        'brand_edit': '/api/v1/brand/edit',
        'brand_delete': '/api/v1/brand/delete',
        'brand_filter': '/api/v1/brand/filter',

        'list_device': '/api/v1/device',
        'view_device': '/api/v1/device/view/',
        'add_device': '/api/v1/device/add',
        'edit_device': '/api/v1/device/edit',
    }
}

export default api;
