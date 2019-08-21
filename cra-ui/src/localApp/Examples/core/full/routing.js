export default {
  matchRoot (location) {
    return /^\/examples\/core\/full\/?$/.test(location.pathname)
  },
  locations: {
    home: {
      en: { pathname: `/examples/core/full/en/home` },
      es: { pathname: `/examples/core/full/es/home` },
    },
    notFound: {
      en: { pathname: `/examples/core/full/en/notFound` },
      es: { pathname: `/examples/core/full/es/notFound` },
    },
  },
  routes: [
    {
      appName: `home`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/full\/en\/home\/?$/.test(location.pathname)
      },
    },
    {
      appName: `home`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/full\/es\/home\/?$/.test(location.pathname)
      },
    },
    {
      appName: `notFound`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/full\/en\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      appName: `notFound`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/full\/es\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      appName: `example`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/full\/en\/example\/\d+\/?$/.test(location.pathname)
      },
    },
    {
      appName: `example`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/full\/es\/example\/\d+\/?$/.test(location.pathname)
      },
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/core\/full\/en\/?$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/core\/full\/es\/?$/.test(location.pathname)
        },
      },
    ],
    notFound: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/core\/full\/en\//.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/core\/full\/es\//.test(location.pathname)
        },
      },
    ],
  },
}