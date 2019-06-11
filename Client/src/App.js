import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from '../src/login';
import ListUsers from '../src/Component/Users/list';
import Dashboard from '../src/Component/Dashboard/index';
import AddUser from '../src/Component/Users/add';
import UpdateUser from '../src/Component/Users/update';
import Layout from '../src/Component/Master/index';
import Brand from '../src/Component/Brands/index';
import BrandList from '../src/Component/Brands/List/List';

import Categories from './Component/Categories/index';
import List_cate from './Component/Categories/List/List';
import Add_cate from './Component/Categories/Action/Add';
import View_cate from './Component/Categories/Action/View';

import Borrow from '../src/Component/Borrow/index';
import ListBorrow from '../src/Component/Borrow/List/List';
import ViewBorrow from '../src/Component/Borrow/Action/View';
import AddBrorrow from '../src/Component/Borrow/Action/Add';
import NotificationBroken from '../src/Component/Borrow/Action/notificationBroken';


import Device from '../src/Component/Devices/index';
import ListDevice from '../src/Component/Devices/List/List';
import ViewDevice from '../src/Component/Devices/Action/View';
import AddDevice from '../src/Component/Devices/Action/Add';

import Maintenance from '../src/Component/Maintenance/index';
import MaintenanceList from '../src/Component/Maintenance/List/List';
import MaintenanceView from '../src/Component/Maintenance/Action/View';
import MaintenanceAdd from '../src/Component/Maintenance/Action/Add';


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
      <Route path="/categories" render={() => (
        <Layout
          content={<Categories content={<List_cate />} />}
        />
      )} exact />
      <Route path="/categories/add" render={(props) => (
        <Layout
          content={<Categories content={<Add_cate {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/categories/edit/:id" render={(props) => (
        <Layout
          content={<Categories content={<Add_cate {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/categories/view/:id" render={(props) => (
        <Layout
          content={<Categories content={<View_cate {...props} />} />}
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
      <Route path="/borrow/notification_broken/:id" render={(props) => (
        <Layout
          content={<Borrow content={<NotificationBroken {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/brand" render={() => (
        <Layout
          content={<Brand content={<BrandList />} />}
        />
      )} exact />

      <Route path="/devices" render={() => (
        <Layout
          content={<Device content={< ListDevice />} />}
        />
      )} exact />
      <Route path="/devices/view/:id" render={(props) => (
        <Layout
          content={<Device content={<ViewDevice {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/devices/add" render={(props) => (
        <Layout
          content={<Device content={<AddDevice {...props} />} />}
          {...props}
        />
      )} exact />
       <Route path="/devices/edit/:id" render={(props) => (
        <Layout
          content={<Device content={<AddDevice {...props} />} />}

      <Route path="/maintenance" render={() => (
        <Layout
          content={<Maintenance content={< MaintenanceList />} />}
        />
      )} exact />
      <Route path="/maintenance/view/:id" render={(props) => (
        <Layout
          content={<Maintenance content={<MaintenanceView {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/maintenance/add" render={(props) => (
        <Layout
          content={<Maintenance content={<MaintenanceAdd {...props} />} />}
          {...props}
        />
      )} exact />
      <Route path="/maintenance/edit/:id" render={(props) => (
        <Layout
          content={<Maintenance content={<MaintenanceAdd {...props} />} />}

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
