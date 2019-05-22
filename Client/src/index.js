import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { render } from "react-dom";
import { Provider as AlertProvider, positions } from 'react-alert'
import AlertTemplate from "react-alert-template-basic";
import App from './App';

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    transition: 'scale'
}

const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
)



ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
