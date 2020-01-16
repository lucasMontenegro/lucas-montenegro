export default {
  matchRoot (location) {
    return /^\/?$/.test(location.pathname)
  },
  locations: {
    home: {
      en: { pathname: `/english/home` },
      es: { pathname: `/español/inicio` },
    },
    notFound: {
      en: { pathname: `/english/not-found` },
      es: { pathname: `/español/no-encontrado` },
    },
  },
  routes: [
    {
      clientName: `home`,
      languageCode: `en`,
      match (location) {
        return /^\/english\/home\/?$/.test(location.pathname)
      },
    },
    {
      clientName: `home`,
      languageCode: `es`,
      match (location) {
        return /^\/español\/inicio\/?$/.test(location.pathname)
      },
    },
    {
      clientName: `notFound`,
      languageCode: `en`,
      match (location) {
        return /^\/english\/not-found\/?$/.test(location.pathname)
      },
    },
    {
      clientName: `notFound`,
      languageCode: `es`,
      match (location) {
        return /^\/español\/no-encontrado\/?$/.test(location.pathname)
      },
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/english\/?$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/español\/?$/.test(location.pathname)
        },
      },
    ],
    notFound: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/english\//.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/español\//.test(location.pathname)
        },
      },
    ],
  },
}