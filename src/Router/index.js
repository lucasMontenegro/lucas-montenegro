import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './components/HomePage';
import TodoList from '../TodoList';
import JsonEditor from '../JsonEditor';

const Router = () => (
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/todo" component={TodoList} />
        <Route exact path="/json-editor" component={JsonEditor} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;