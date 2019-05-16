import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from '../src/login';
import ListUsers from  '../src/Component/Users/list';
import Dashboard from '../src/Component/Dashboard/index';
import addUser from '../src/Component/Users/add';

import Layout from '../src/Component/Master/index';

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
      <Layout>
          <Router>
                <div className="App">
                    <Route path="/" exact component={Login} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/user/update" component={addUser} />
                    <Route path="/user" component={ListUsers} />
                </div>
          </Router>
      </Layout>
  );
}

export default App;
