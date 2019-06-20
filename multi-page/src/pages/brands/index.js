import React from 'react';
import ReactDOM from 'react-dom';
import TemplateBrand from './js/template';
import Layout from '../../components/partials/index';
import { Provider as AlertProvider, positions } from 'react-alert'
import AlertTemplate from "react-alert-template-basic";


const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  transition: 'scale'
}

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <Layout content={<TemplateBrand />} />
  </AlertProvider>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
