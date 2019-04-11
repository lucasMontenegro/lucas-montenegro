import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TodoList from '../TodoList';
import JsonEditor from '../JsonEditor';

const Router = () => (
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/todo">Todo List</Link>
          </li>
          <li>
            <Link to="/json-editor">JSON Editor</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/todo" component={TodoList} />
        <Route exact path="/json-editor" component={JsonEditor} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;