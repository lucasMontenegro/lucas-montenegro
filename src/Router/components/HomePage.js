import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => (
  <div>
    <h3>Welcome To My Personal Website</h3>
    <p>
      I am a self-taught, junior Web Developer, currently building this
      website as a learning project. Read more in the <Link to="/about">About
      Page</Link>.
    </p>
    <nav>
      <h4>Apps</h4>
      <ul>
        <li>
          <Link to="/todo">Todo List</Link>
        </li>
        <li>
          <Link to="/json-editor">JSON Editor</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default HomePage;
