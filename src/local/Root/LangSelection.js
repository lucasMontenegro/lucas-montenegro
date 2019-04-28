import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import routes from './routes';

const LangSelection = ({ langSelection: routeName }) => {
  const path = routes.paths[routeName];
  return (
    <ul>
      {routes.languages.map(language => (
        <li key={language.path}>
          <Link exact to="/" style={style} activeStyle={activeStyle}>
            Home
          </Link>
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps = ({ rootApp: { title } }) => ({ title });
export default connect(mapStateToProps)(LangSelection);
