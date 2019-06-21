// import React, {useState, useEffect} from 'react';
// import { Router, Route, Link } from 'react-router-dom';
//
// import { history, Role } from '../../_helpers';
// import { authenticationService } from '../../_services';
// import { PrivateRoute } from '../../components';
// import { HomePage } from '../../pages/HomePage';
// import { AdminPage } from '../../pages/AdminPage';
// import { LoginPage } from '../../pages/LoginPage';
//
// export function App() {
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);
//
//     useEffect(() => {
//         authenticationService.currentUser.subscribe(x => {
//             if(x) {
//                 let user_data = x.payload.userData;
//                 if (user_data.role === 'Administrator') {
//                     setIsAdmin(true)
//                 }
//                 setCurrentUser(user_data);
//             }
//         })
//     });
//
//     function logout() {
//         authenticationService.logout();
//         history.push('/login');
//     }
//
//     return (
//         <Router history={history}>
//             <div>
//                 {currentUser &&
//                 <nav className="navbar navbar-expand navbar-dark bg-dark">
//                     <div className="navbar-nav">
//                         <Link to="/" className="nav-item nav-link">Home</Link>
//                         {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
//                         <a onClick={logout} className="nav-item nav-link">Logout</a>
//                     </div>
//                 </nav>
//                 }
//                 <div className="jumbotron">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-md-6 offset-md-3">
//                                 <PrivateRoute exact path="/" component={HomePage} />
//                                 <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
//                                 <Route path="/login" component={LoginPage} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Router>
//     );
// }
