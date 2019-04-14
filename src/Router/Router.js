import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from 'styled-components';

import NavBar from './NavBar';
import HomePage from './HomePage';
import MyProjects from './MyProjects';
import TodoList from '../TodoList';
import JsonEditor from '../JsonEditor';
import { palette } from '../nuts-and-bolts';


const SizingDiv = styled.div`
  max-width: 80ch;
  min-height: 100vh;
  margin: 0px auto;
  padding: 0 1ch 1ch 1ch;
`;

const ContentDiv = styled.div`
  border: 0.1ch solid ${palette.green.light};
  border-radius: 2px;
  padding: 0.9ch;
  min-height: 35em;
`;

export const PureRouter = ({ children }) => (
  <SizingDiv>
    <NavBar />
    <ContentDiv>
      {children}
    </ContentDiv>
  </SizingDiv>
);


const Router = () => (
  <BrowserRouter>
    <PureRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/my-projects" component={MyProjects} />
        <Route exact path="/todo" component={TodoList} />
        <Route exact path="/json-editor" component={JsonEditor} />
      </Switch>
    </PureRouter>
  </BrowserRouter>
);

export default Router;
