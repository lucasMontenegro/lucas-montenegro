import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store';


// json editor
import JsonEditor from './JsonEditor';


// todo list
/**
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './TodoList/actions';
/**/
import TodoList from './TodoList';


ReactDOM.render(
  <Provider store={store}>
    <Router>
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
    </Router>
  </Provider>,
  document.getElementById('root')
);


// todo list
/*
// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// Stop listening to state updates
unsubscribe();
/**/


// original app
//ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
