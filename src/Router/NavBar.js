import React from 'react';
import { Link } from "react-router-dom";
import LanguageToggle from './LanguageToggle';

export const PureNavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <LanguageToggle />
      </li>
    </ul>
  </nav>
);

export default PureNavBar;
