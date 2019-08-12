export default {
  matchRoot (location) {
    return /^\/examples\/core\/router\/?$/.test(location.pathname)
  },
  locations: {
    home: {
      en: { pathname: `/examples/core/router/en/home` },
      es: { pathname: `/examples/core/router/es/home` },
    },
    notFound: {
      en: { pathname: `/examples/core/router/en/notFound` },
      es: { pathname: `/examples/core/router/es/notFound` },
    },
  },
  routes: [
    {
      appName: `home`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/router\/en\/home\/?$/.test(location.pathname)
      },
    },
    {
      appName: `home`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/router\/es\/home\/?$/.test(location.pathname)
      },
    },
    {
      appName: `notFound`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/router\/en\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      appName: `notFound`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/router\/es\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      appName: `example`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/router\/en\/example\/\d+\/?$/.test(location.pathname)
      },
    },
    {
      appName: `example`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/router\/es\/example\/\d+\/?$/.test(location.pathname)
      },
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/core\/router\/en\/?$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/core\/router\/es\/?$/.test(location.pathname)
        },
      },
    ],
    notFound: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/core\/router\/en\//.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/core\/router\/es\//.test(location.pathname)
        },
      },
    ],
  },
}