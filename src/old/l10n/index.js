export default {
  english: {
    name: 'English',
    home: '/home',
    routes: {
      home: {
        match (location) {
          return /^\/english\/home\/?/.test(location.pathname);
        },
        render: {
          title: `Home`,
          text: `Hello! Welcome to my personal website. My name is Lucas Montenegro and I am a Web Developer from Argentina.`,
        },
      },
    },
    notFound: {
      title: `Not Found`,
      text: `Sorry, the page you were looking for is not here`,
    },
    nav: [
      {
        to: '/english/home'
        text: 'Home'
      }
    ],
    card: {
      text: 'Go to the English language website'
    },
  },
  español: {
    name: `Español`,
    home: `/inicio`,
    routes: {
      home: {
        match (location) {
          return /^\/español\/inicio\/?/.test(location.pathname);
        },
        render: {
          title: `Inicio`,
          text: `Hola! Bienvenido a mi página web personal. Mi nombre es Lucas Montenegro y soy un Programador Web de Argentina.`,
        },
      },
    },
    notFound: {
      title: `No Disponible`,
      text: `No se ha encontrado la página que estabas buscando`,
    },
    nav: [
      {
        to: `/español/inicio`
        text: `Inicio`
      }
    ],
    card: {
      text: `Ir a la versión en español`
    },
  },
};