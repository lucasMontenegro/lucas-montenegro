import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import NavBar from './NavBar';
import HomePage from './HomePage';
import TodoList from '../TodoList';
import JsonEditor from '../JsonEditor';

export const PureRouter = ({ children }) => (
  <Container>
    <NavBar />
    {children}
  </Container>
);


const Router = () => (
  <BrowserRouter>
    <PureRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/todo" component={TodoList} />
        <Route exact path="/json-editor" component={JsonEditor} />
      </Switch>
    </PureRouter>
  </BrowserRouter>
);

export default Router;
