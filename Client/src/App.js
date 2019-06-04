import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from '../src/login';
import ListUsers from '../src/Component/Users/list';
import Dashboard from '../src/Component/Dashboard/index';
import AddUser from '../src/Component/Users/add';
import UpdateUser from '../src/Component/Users/update';
import Layout from '../src/Component/Master/index';

import Borrow from '../src/Component/Borrow/index';
import ListBorrow from '../src/Component/Borrow/List/List';
import ViewBorrow from '../src/Component/Borrow/Action/View';
import AddBrorrow from '../src/Component/Borrow/Action/Add';

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route path="/dashboard" render={() => (
        <Layout
          content={<Dashboard />}
        />
      )} />
      <Route path="/user" render={() => (
        <Layout
          content={<ListUsers />}
        />
      )} exact />
      <Route path="/user/update" render={(props) => (
        <Layout
          content={<AddUser  {...props} />}
          {...props}
        />
      )} />
      <Route path="/user/edit/:id" render={(props) => (
        <Layout
          content={<UpdateUser  {...props} />}
          {...props}
        />
      )} exact />
      <Route path="/borrow" render={() => (
        <Layout
          content={<Borrow content={< ListBorrow />} />}
        />
      )} exact />
      <Route path="/borrow/view/:id" render={(props) => (
        <Layout
          content={<Borrow content={<ViewBorrow {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/borrow/add" render={(props) => (
        <Layout
          content={<Borrow content={<AddBrorrow {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/borrow/edit/:id" render={(props) => (
        <Layout
          content={<Borrow content={<AddBrorrow {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/" component={Login} exact />
    </Router>

    // <Layout>
    //     <Router>
    //           <div className="App">
    //               <Route path="/" exact component={Login} />
    //               <Route path="/dashboard" exact component={Dashboard} />
    //               <Route path="/user/update" component={addUser} />
    //               <Route path="/user" component={ListUsers} />
    //           </div>
    //     </Router>
    // </Layout>
  );
}

export default App;
