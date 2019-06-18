import { Role } from './'
import { authenticationService } from '../_services';
function configureBackend() {

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const currentUser = authenticationService.currentUserValue;
        const authHeader = opts.headers['Authorization'];
        const isLoggedIn = authHeader && authHeader.startsWith(`Bearer ${currentUser.payload.token}`);
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[currentUser.payload.userData.role] : null;
        const users = currentUser ? currentUser : null;

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                // if (url.endsWith(`${currentUser.payload.userData.id}`) && opts.method === 'GET') {console.log(url);
                //     const params = JSON.parse(opts.body);
                //     const user = users.find(x => x.username === params.username && x.password === params.password);
                //     if (!user) return error('Username or password is incorrect');
                //     return ok({
                //         currentUser : currentUser
                //     });
                // }

                // get user by id - admin or user (user can only access their own record)
                if (url.match(/\/user\/show\/\d+$/) && opts.method === 'GET') {

                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    // only allow normal users access to their own record
                    //const currentUser = users1.find(x => x.role === role);console.log(currentUser);
                    if (id !== users.payload.userData.id && role !== Role.Administrator) return unauthorised();

                    //return ok(users);
                }

                //get all users - admin only
                if (url.endsWith('/user') && opts.method === 'GET') {
                    if (role !== Role.Administrator) return unauthorised();
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => {
                    resolve(response);

                });

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
};
export default configureBackend;
