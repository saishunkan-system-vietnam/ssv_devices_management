import React from 'react';
import ReactDOM from 'react-dom';
import TemplateCategories from './js/Template';
import Layout from '../../components/partials/index';
import { Provider as AlertProvider, positions } from 'react-alert'
import AlertTemplate from "react-alert-template-basic";
import CategoriesAction from './js/add';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  transition: 'scale'
}

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <Layout content={<TemplateCategories content={<CategoriesAction />} />} />
  </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
