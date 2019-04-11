import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import TodoList from '../TodoList';
import JsonEditor from '../JsonEditor';

const Router = () => (
  <BrowserRouter>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/todo" component={TodoList} />
        <Route exact path="/json-editor" component={JsonEditor} />
      </Switch>
    </div>
  </BrowserRouter>
);


export default Router;