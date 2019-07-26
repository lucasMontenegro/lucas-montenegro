export default {
  matchRoot (location) {
    return /^\/examples\/router\/?$/.test(location.pathname)
  },
  locations: {
    home: {
      en: { pathname: `/examples/router/en/home` },
      es: { pathname: `/examples/router/es/home` },
    },
    notFound: {
      en: { pathname: `/examples/router/en/notFound` },
      es: { pathname: `/examples/router/es/notFound` },
    },
  },
  routes: [
    {
      appName: `home`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/router\/en\/home\/?$/.test(location.pathname)
      },
    },
    {
      appName: `home`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/router\/es\/home\/?$/.test(location.pathname)
      },
    },
    {
      appName: `notFound`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/router\/en\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      appName: `notFound`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/router\/es\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      appName: `example`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/router\/en\/example\/?$/.test(location.pathname)
      },
    },
    {
      appName: `example`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/router\/es\/example\/?$/.test(location.pathname)
      },
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/router\/en\/?$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/router\/es\/?$/.test(location.pathname)
        },
      },
    ],
    notFound: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/router\/en\//.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/router\/es\//.test(location.pathname)
        },
      },
    ],
  },
}