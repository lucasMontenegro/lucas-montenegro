function languageLinkFactory (location, locales) {
  return language => ({
    key: language,
    location: `/${language}/h`,
    text: locales[language].name,
  })
}

export default {
  english: {
    name: `English`,
    redirect (location) {
      return `/english/home`
    },
    match (location) {
      return /^\/english\/home\/?/.test(location.pathname)
    },
    languageLinkFactory,
    render: {
      title: `Home`,
      text: `Hello! Welcome to my personal website. My name is Lucas Montenegro and I am a Web Developer from Argentina.`,
    },
  },
  español: {
    name: `Español`,
    redirect (location) {
      return `/español/inicio`
    },
    match (location) {
      return /^\/español\/inicio\/?/.test(location.pathname)
    },
    languageLinkFactory,
    render: {
      title: `Inicio`,
      text: `Hola! Bienvenido a mi página web personal. Mi nombre es Lucas Montenegro y soy un Programador Web de Argentina.`,
    },
  },
}
