import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import * as serviceWorker from './serviceWorker';
import './i18n';
import './font-awesome';

import store from './store';
import Router from './Router';

ReactDOM.render(
  <Fragment>
    <CssBaseline />
    <Provider store={store}><Router /></Provider>
  </Fragment>,
  document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
