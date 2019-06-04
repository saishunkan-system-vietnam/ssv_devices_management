
let api = {
    "Url" : "http://localhost",
    'endpoint' : {
        'auth' : '/auth/signin',
        'login' : '/api/v1/user/login',
        'update_profile' : '/api/v1/user/profile',
        'lstusers' : '/api/v1/user',
        'show_user' : '/api/v1/user/show/',
        'restock_user' : '/api/v1/user/restock',
        'delete_user' : '/api/v1/user/delete',
        'list_borrow' : '/api/v1/borrow',
        'view_borrow' : '/api/v1/borrow/view/',
        'add_borrow' : '/api/v1/borrow/add',
        'edit_borrow' : '/api/v1/borrow/edit',
        'delete_borrow' : '/api/v1/borrow/delete',
        'approve_borrow' : '/api/v1/borrow/approve',
        'list_device' : '/api/v1/device',
    }
}

export  default  api;