import React from 'react';
import Typography from '@material-ui/core/Typography';
import Root, { Router } from 'local/Root';
import render from 'local/render';
import * as serviceWorker from 'local/serviceWorker';
import 'local/font-awesome';
import 'typeface-roboto';

const home = {
  title: 'Lucas Montenegro',
  route: {
    path: '/',
    exact: true,
  },
  Component: function Home () {
    return (
      <Typography variant="body1">Welcome to my personal website.</Typography>
    );
  },
}

const about = {
  title: 'Lucas Montenegro - About Me',
  route: {
    path: '/about',
    exact: true,
  },
  Component: function About () {
    return (
      <Typography variant="body1">I am a Junior Web Developer.</Typography>
    );
  },
}

const contact = {
  title: 'Lucas Montenegro - Contact Links',
  route: {
    path: '/contact',
    exact: true,
  },
  Component: function Contact () {
    return (
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/lucas-montenegro-1b191915a/">
            Linkedin
          </a>
        </li>
        <li>
          <a href="https://github.com/lucasMontenegro/">
            GitHub
          </a>
        </li>
      </ul>
    );
  },
}

render(<Root><Router render={{ home, about, contact }}/></Root>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
