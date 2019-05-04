function languageLinkFactory (language, location) {
  return `/${language}/h`
}

export default {
  english: {
    localize (location) {
      return `/english/home`
    },
    match (location) {
      return /^\/english\/home\/?/.test(location.pathname)
    },
    frameProps: {
      title: `Home`,
      languageLinkFactory,
    },
    render: {
      text: `Hello! Welcome to my personal website. My name is Lucas Montenegro and I am a Web Developer from Argentina.`,
    },
  },
  español: {
    localize (location) {
      return `/español/inicio`
    },
    match (location) {
      return /^\/español\/inicio\/?/.test(location.pathname)
    },
    frameProps: {
      title: `Inicio`,
      languageLinkFactory,
    },
    render: {
      text: `Hola! Bienvenido a mi página web personal. Mi nombre es Lucas Montenegro y soy un Programador Web de Argentina.`,
    },
  },
}
