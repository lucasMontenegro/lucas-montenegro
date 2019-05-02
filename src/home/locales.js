export default {
  english: {
    match (location) {
      const bool = /^\/english\/home\/?/.test(location.pathname)
      return bool
    },
    from (location) {
      return `/english/home`
    },
    render: {
      title: `Home`,
      text: `Hello! Welcome to my personal website. My name is Lucas Montenegro and I am a Web Developer from Argentina.`,
    },
  },
  español: {
      match (location) {
        return /^\/español\/inicio\/?/.test(location.pathname)
      },
      from (location) {
        return `/español/inicio`
      },
      render: {
        title: `Inicio`,
        text: `Hola! Bienvenido a mi página web personal. Mi nombre es Lucas Montenegro y soy un Programador Web de Argentina.`,
      },
  },
}
