import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from '../src/login';
import ListUsers from  '../src/Component/Users/list';
import Dashboard from '../src/Component/Dashboard/index';
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
        <div className="App">
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/users" component={ListUsers} />
        </div>
    </Router>
  );
}

export default App;
