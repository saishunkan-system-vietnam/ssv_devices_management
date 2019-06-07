import React  from 'react';
import style from './Menu.css';
import './common.css';

function Menu() {
    return (
      <ul className={style.Menu}>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/products/product-1.html">Product</a></li>
        <li><a href="/contacts/contact.html">Contact</a></li>
        <li><a href="/signin/signin.html">Signin</a></li>
        <li><a href="/users/update.html">Users</a></li>
        <li><a href="/login/login.html">Login</a></li>
      </ul>
    );
}
export default Menu;
