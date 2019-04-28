import React from 'react';
import { NavLink } from "react-router-dom";

const style = {
  textDecoration: 'none',
  color: 'black',
};
const activeStyle = {
  textDecoration: 'none',
  color: 'blue',
};

export default function Nav () {
  return (
    <ul>
      <li>
        <NavLink exact to="/" style={style} activeStyle={activeStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/about" style={style} activeStyle={activeStyle}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/contact" style={style} activeStyle={activeStyle}>
          Contact
        </NavLink>
      </li>
    </ul>
  );
}
