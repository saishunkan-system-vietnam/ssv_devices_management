import React from 'react';
import logo from './logo.svg';
import './App.css';
import  ListUsers from  '../src/Component/Users/list';
import  Login from '../src/login';
function App() {
  return (
    <div className="App">
        <ListUsers />
        <Login />
    </div>
  );
}

export default App;
