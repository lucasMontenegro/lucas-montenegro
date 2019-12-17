export default {
  clientNames: [`home`, `foo`, `notFound`],
  languageCodes: [`en`, `es`],
  languageNames: {
    en: `English`,
    es: `Spanish`,
  },
  locations: {
    home: { pathname: `/react/routing/en/home/2` },
    foo: { pathname: `/react/routing/en/foo/5` },
    notFound: { pathname: `/react/routing/en/notFound` },
  },
  matchers: {
    root (location) {
      return /^\/react\/routing\/?$/.test(location.pathname)
    },
    languageOnly: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/react\/routing\/en\/?$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/react\/routing\/es\/?$/.test(location.pathname)
        },
      },
    ],
    client: [
      {
        clientName: `home`,
        languageCode: `en`,
        match (location) {
          return /^\/react\/routing\/en\/home\/\d\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `home`,
        languageCode: `es`,
        match (location) {
          return /^\/react\/routing\/es\/home\/\d\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `foo`,
        languageCode: `en`,
        match (location) {
          return /^\/react\/routing\/en\/foo\/\d\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `foo`,
        languageCode: `es`,
        match (location) {
          return /^\/react\/routing\/es\/foo\/\d\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `notFound`,
        languageCode: `en`,
        match (location) {
          return /^\/react\/routing\/en\/notFound\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `notFound`,
        languageCode: `es`,
        match (location) {
          return /^\/react\/routing\/es\/notFound\/?$/.test(location.pathname)
        },
      },
    ],
    unknownClient: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/react\/routing\/en\/.+/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/react\/routing\/es\/.+/.test(location.pathname)
        },
      },
    ],
  },
  linkTranslators: {
    home: {
      en: {
        toIntl(location) {
          return location.pathname.charAt(23)
        },
        toLocal(n) {
          return { pathname: `/react/routing/en/home/${n}` }
        },
      },
      es: {
        toIntl(location) {
          return location.pathname.charAt(23)
        },
        toLocal(n) {
          return { pathname: `/react/routing/es/home/${n}` }
        },
      },
    },
    foo: {
      en: {
        toIntl(location) {
          return location.pathname.charAt(22)
        },
        toLocal(n) {
          return { pathname: `/react/routing/en/foo/${n}` }
        },
      },
      es: {
        toIntl(location) {
          return location.pathname.charAt(22)
        },
        toLocal(n) {
          return { pathname: `/react/routing/es/foo/${n}` }
        },
      },
    },
    notFound: {
      en: {
        toIntl(location) {
          return location.state
        },
        toLocal(state) {
          return { pathname: `/react/routing/en/notFound`, state }
        },
      },
      es: {
        toIntl(location) {
          return location.state
        },
        toLocal(state) {
          return { pathname: `/react/routing/es/notFound`, state }
        },
      },
    },
  },
}