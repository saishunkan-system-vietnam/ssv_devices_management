import React  from 'react';
import style from './Menu.css';
import './common.css';

function Menu() {
    return (
      <ul className={style.Menu}>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/signin/signin.html">Signin</a></li>
      </ul>
    );
}
export default Menu;
