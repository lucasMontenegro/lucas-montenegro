export default {
  english: {
    name: `English`,
    match (location) {
      const bool = /^\/english\/home\/?/.test(location.pathname)
      return bool
    },
    from (location) {
      return `/english/home`
    },
    toIntl (location) {
      return language => `/${language}/h`
    },
    render: {
      title: `Home`,
      text: `Hello! Welcome to my personal website. My name is Lucas Montenegro and I am a Web Developer from Argentina.`,
    },
  },
  español: {
    name: `Español`,
    match (location) {
      return /^\/español\/inicio\/?/.test(location.pathname)
    },
    from (location) {
      return `/español/inicio`
    },
    toIntl (location) {
      return language => `/${language}/h`
    },
    render: {
      title: `Inicio`,
      text: `Hola! Bienvenido a mi página web personal. Mi nombre es Lucas Montenegro y soy un Programador Web de Argentina.`,
    },
  },
}
