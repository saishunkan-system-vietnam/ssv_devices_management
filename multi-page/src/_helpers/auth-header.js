import { authenticationService } from '../_services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.payload.token) {
        return { Authorization: `Bearer ${currentUser.payload.token}` };
    } else {
        return {};
    }
}
