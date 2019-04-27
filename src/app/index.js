import React from 'react';
import Typography from '@material-ui/core/Typography';
import Root from 'local/Root';
import render from 'local/render';
import * as serviceWorker from 'local/serviceWorker';
import 'local/font-awesome';
import 'typeface-roboto';

class Home extends React.PureComponent {
  static title = 'Lucas Montenegro';
  static route = {
    path: '/',
    exact: true,
  };
  render () {
    return (
      <Typography variant="body1">Welcome to my personal website.</Typography>
    );
  }
}

class About extends React.PureComponent {
  static title = 'Lucas Montenegro - About Me';
  static route = {
    path: '/about',
    exact: true,
  };
  render () {
    return (
      <Typography variant="body1">
        My name is Lucas Montenegro and I am a Junior Web Developer.
      </Typography>
    );
  }
}

class Contact extends React.PureComponent {
  static title = 'Lucas Montenegro - Contact Links';
  static route = {
    path: '/contact',
    exact: true,
  };
  render () {
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
  }
}

render(<Root routes={[Home, About, Contact]}/>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
