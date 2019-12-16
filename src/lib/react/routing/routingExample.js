export default {
  clientNames: [`home`, `foo`, `notFound`],
  languageCodes: [`en`, `es`],
  languageNames: {
    en: `English`,
    es: `Spanish`,
  },
  locations: {
    home: { pathname: `/routing/en/home` },
    foo: { pathname: `/routing/en/foo/5` },
    notFound: { pathname: `/routing/en/notFound` },
  },
  matchers: {
    root (location) {
      return /^\/routing\/?$/.test(location.pathname)
    },
    languageOnly: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/routing\/en\/?$/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/routing\/es\/?$/.test(location.pathname)
        },
      },
    ],
    client: [
      {
        clientName: `home`,
        languageCode: `en`,
        match (location) {
          return /^\/routing\/en\/home\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `home`,
        languageCode: `es`,
        match (location) {
          return /^\/routing\/es\/home\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `foo`,
        languageCode: `en`,
        match (location) {
          return /^\/routing\/en\/foo\/\d\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `foo`,
        languageCode: `es`,
        match (location) {
          return /^\/routing\/es\/foo\/\d\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `notFound`,
        languageCode: `en`,
        match (location) {
          return /^\/routing\/en\/notFound\/?$/.test(location.pathname)
        },
      },
      {
        clientName: `notFound`,
        languageCode: `es`,
        match (location) {
          return /^\/routing\/es\/notFound\/?$/.test(location.pathname)
        },
      },
    ],
    unknownClient: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/routing\/en\/.+/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/routing\/es\/.+/.test(location.pathname)
        },
      },
    ],
  },
  linkTranslators: {
    home: {
      en: {
        toIntl() {
          return null
        },
        toLocal() {
          return { pathname: `/routing/en/home` }
        },
      },
      es: {
        toIntl() {
          return null
        },
        toLocal() {
          return { pathname: `/routing/es/home` }
        },
      },
    },
    foo: {
      en: {
        toIntl(location) {
          return location.pathname.charAt(16)
        },
        toLocal(n) {
          return { pathname: `/routing/en/foo/${n}` }
        },
      },
      es: {
        toIntl(location) {
          return location.pathname.charAt(16)
        },
        toLocal(n) {
          return { pathname: `/routing/es/foo/${n}` }
        },
      },
    },
    notFound: {
      en: {
        toIntl(location) {
          return location.state
        },
        toLocal(state) {
          return { pathname: `/routing/en/notFound`, state }
        },
      },
      es: {
        toIntl(location) {
          return location.state
        },
        toLocal(state) {
          return { pathname: `/routing/es/notFound`, state }
        },
      },
    },
  },
}