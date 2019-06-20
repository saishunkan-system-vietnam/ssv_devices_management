import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

function withAuth(ComponentToProtect) {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    if(authenticationService.currentUserValue){
        setLoading(false);
        setRedirect(true);
    }

}
export default withAuth;

// export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
//     <Route {...rest} render={props => {
//         const currentUser = authenticationService.currentUserValue;
//         if (!currentUser) {
//             // not logged in so redirect to login page with the return url
//             return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         }
//
//         // check if route is restricted by role
//         if (roles && roles.indexOf(currentUser.payload.userData.role) == -1) {
//             // role not authorised so redirect to home page
//             return <Redirect to={{ pathname: '/'}} />
//         }
//
//         // authorised so return component
//         return <Component {...props} />
//     }} />
// )
