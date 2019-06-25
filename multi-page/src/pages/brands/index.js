import React from 'react';
import ReactDOM from 'react-dom';
import TemplateBrand from './components/template';
import Layout from '../../components/partials/index';
import { Provider as Alert_provider, positions } from 'react-alert'
import AlertTemplate from "react-alert-template-basic";
import { createStore, applyMiddleware } from 'redux';
import appReducers from './reducers';
import { Provider as Redux_provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(
  appReducers,applyMiddleware(thunk)
);

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  transition: 'scale'
}

const Root = () => (
  <Alert_provider template={AlertTemplate} {...options}>
    <Layout content={<TemplateBrand />} />
  </Alert_provider>
)

ReactDOM.render(
  <Redux_provider store={store}>
    <Root />
  </Redux_provider>,
  document.getElementById('root')
);
