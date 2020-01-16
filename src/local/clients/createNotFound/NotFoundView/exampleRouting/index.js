export default {
  matchRoot (location) {
    return !location.pathname
  },
  locations: {
    home: {
      en: { pathname: `/en/home` },
      es: { pathname: `/es/home` },
    },
    notFound: {
      en: { pathname: `/en/notFound` },
      es: { pathname: `/es/notFound` },
    },
  },
  routes: [
    {
      clientName: `home`,
      languageCode: `en`,
      match (location) {
        return /^\/en\/home$/.test(location.pathname)
      },
    },
    {
      clientName: `home`,
      languageCode: `es`,
      match (location) {
        return /^\/es\/home$/.test(location.pathname)
      },
    },
    {
      clientName: `notFound`,
      languageCode: `en`,
      match (location) {
        return /^\/en\/notFound$/.test(location.pathname)
      },
    },
    {
      clientName: `notFound`,
      languageCode: `es`,
      match (location) {
        return /^\/es\/notFound$/.test(location.pathname)
      },
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/en$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/es$/.test(location.pathname)
        },
      },
    ],
    notFound: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/en\//.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/es\//.test(location.pathname)
        },
      },
    ],
  },
}