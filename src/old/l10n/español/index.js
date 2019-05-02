export default {
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
};
