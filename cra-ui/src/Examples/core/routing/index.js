export default {
  matchRoot (location) {
    return /^\/examples\/core\/routingMountPoint\/?$/.test(location.pathname)
  },
  locations: {
    home: {
      en: { pathname: `/examples/core/routingMountPoint/en/home` },
      es: { pathname: `/examples/core/routingMountPoint/es/home` },
    },
    notFound: {
      en: { pathname: `/examples/core/routingMountPoint/en/notFound` },
      es: { pathname: `/examples/core/routingMountPoint/es/notFound` },
    },
  },
  routes: [
    {
      appName: `home`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/routingMountPoint\/en\/home\/?$/.test(location.pathname)
      },
    },
    {
      appName: `home`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/routingMountPoint\/es\/home\/?$/.test(location.pathname)
      },
    },
    {
      appName: `notFound`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/routingMountPoint\/en\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      appName: `notFound`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/routingMountPoint\/es\/notFound\/?$/.test(location.pathname)
      },
    },
    {
      appName: `example`,
      languageCode: `en`,
      match (location) {
        return /^\/examples\/core\/routingMountPoint\/en\/example\/\d+\/?$/.test(location.pathname)
      },
    },
    {
      appName: `example`,
      languageCode: `es`,
      match (location) {
        return /^\/examples\/core\/routingMountPoint\/es\/example\/\d+\/?$/.test(location.pathname)
      },
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/core\/routingMountPoint\/en\/?$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/core\/routingMountPoint\/es\/?$/.test(location.pathname)
        },
      },
    ],
    notFound: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/examples\/core\/routingMountPoint\/en\//.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/examples\/core\/routingMountPoint\/es\//.test(location.pathname)
        },
      },
    ],
  },
}