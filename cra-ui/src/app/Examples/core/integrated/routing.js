export default {
  matchRoot (location) {
    return /^\/examples\/core\/integrated\/?$/.test(location.pathname)
  },
  locations: {
    home: {
      en: { pathname: `/examples/core/integrated/en/home` },
      es: { pathname: `/examples/core/integrated/es/home` },
    },
    notFound: {
      en: { pathname: `/examples/core/integrated/en/notFound` },
      es: { pathname: `/examples/core/integrated/es/notFound` },
    },
  },
  routes: [
    {
      clientName: `home`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/integrated\/en\/home\/?$/.test(location.pathname)
      },
    },
    {
      clientName: `home`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/integrated\/es\/home\/?$/.test(location.pathname)
      },
    },
    {
      clientName: `notFound`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/integrated\/en\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      clientName: `notFound`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/integrated\/es\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      clientName: `example`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/integrated\/en\/example\/\d+\/?$/.test(location.pathname)
      },
    },
    {
      clientName: `example`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/integrated\/es\/example\/\d+\/?$/.test(location.pathname)
      },
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/core\/integrated\/en\/?$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/core\/integrated\/es\/?$/.test(location.pathname)
        },
      },
    ],
    notFound: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/core\/integrated\/en\//.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/core\/integrated\/es\//.test(location.pathname)
        },
      },
    ],
  },
}