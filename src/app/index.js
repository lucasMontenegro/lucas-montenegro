import React from 'react';
import Root, { Router } from 'local/Root';
import render from 'local/render';
import * as serviceWorker from 'local/serviceWorker';
import 'local/font-awesome';
import 'typeface-roboto';
import español from './español';
import english from './english';

render(<Root><Router render={{ english, español }}/></Root>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
