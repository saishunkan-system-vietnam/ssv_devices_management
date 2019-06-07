import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './signin-form';

import Logo from '../../components/assets/images/icon/saishunkan-system-vietnam-logo.jpg';

ReactDOM.render(
  <LoginForm />,
  document.getElementById('root')
);
document.getElementById('logo-pic').setAttribute('src', Logo);
