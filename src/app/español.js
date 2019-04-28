import React from 'react';
import Typography from '@material-ui/core/Typography';
import ContactLinks from './ContactLinks';

export default {
  home: {
    title: 'Lucas Montenegro',
    match (location) {
      return /^\/español\/inicio\/?$/.test(location.pathname);
    },
    compile (location) {
      return {
        pathname: '/español/inicio',
        search: location.search,
        hash: location.hash,
      };
    },
    Component: function Inicio () {
      return (
        <Typography variant="body1">
          Bienvenido a mi página web personal.
        </Typography>
      );
    },
  },
  about: {
    title: 'Lucas Montenegro - Sobre mí',
    match (location) {
      return /^\/español\/sobre-mí\/?$/.test(location.pathname);
    },
    compile (location) {
      return {
        pathname: '/español/sobre-mí',
        search: location.search,
        hash: location.hash,
      };
    },
    Component: function SobreMí () {
      return (
        <Typography variant="body1">
          Soy un Programador Web Junior.
        </Typography>
      );
    },
  },
  contact: {
    title: 'Lucas Montenegro - Links De Contacto',
    match (location) {
      return /^\/español\/contacto\/?$/.test(location.pathname);
    },
    compile (location) {
      return {
        pathname: '/español/contacto',
        search: location.search,
        hash: location.hash,
      };
    },
    Component: function Contacto () {
      return <ContactLinks />;
    },
  },
  notFound: {
    title: 'Lucas Montenegro - Nada Por Aquí',
    match (location) {
      return /^\/español\/no-encontrado\/?$/.test(location.pathname);
    },
    compile (location) {
      return {
        pathname: '/español/no-encontrado',
        search: location.search,
        hash: location.hash,
      };
    },
    Component: function NoEncontrado () {
      return <div>:(</div>;
    },
  },
};
