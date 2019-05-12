import React from 'react';
import Typography from '@material-ui/core/Typography';
import ContactLinks from './ContactLinks';

export default {
  home: {
    title: 'Lucas Montenegro',
    match (location) {
      return /^\/english\/home\/?$/.test(location.pathname);
    },
    compile (location) {
      return {
        pathname: '/english/home',
        search: location.search,
        hash: location.hash,
      };
    },
    Component: function Home () {
      return (
        <Typography variant="body1">
          Welcome to my personal website.
        </Typography>
      );
    },
  },
  about: {
    title: 'Lucas Montenegro - About Me',
    match (location) {
      return /^\/english\/about-me\/?$/.test(location.pathname);
    },
    compile (location) {
      return {
        pathname: '/english/about-me',
        search: location.search,
        hash: location.hash,
      };
    },
    Component: function About () {
      return (
        <Typography variant="body1">I am a Junior Web Developer.</Typography>
      );
    },
  },
  contact: {
    title: 'Lucas Montenegro - Contact',
    match (location) {
      return /^\/english\/contact\/?$/.test(location.pathname);
    },
    compile (location) {
      return {
        pathname: '/english/contact',
        search: location.search,
        hash: location.hash,
      };
    },
    Component: function Contact () {
      return <ContactLinks />;
    },
  },
  notFound: {
    title: 'Lucas Montenegro - Not Found',
    match (location) {
      return /^\/english\/not-found\/?$/.test(location.pathname);
    },
    compile (location) {
      return {
        pathname: '/english/not-found',
        search: location.search,
        hash: location.hash,
      };
    },
    Component: function NotFound () {
      return <div>:(</div>;
    },
  },
};
