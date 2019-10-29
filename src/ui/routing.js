import supportedLanguages from "languages/supported"
export default {
  languageCodes: supportedLanguages,
  languageNames: {
    en: `English`,
    es: `Español`,
  },
  clientNames: [`home`, `notFound`],
  routes: {
    matchRoot (location) {
      return /^\/?$/.test(location.pathname)
    },
    languageOnly: [
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
    client: [
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
    clientNotFound: [
      {
        languageCode: `en`,
        match (location) {
          return /^\/english\/.+/.test(location.pathname)
        },
      },
      {
        languageCode: `es`,
        match (location) {
          return /^\/español\/.+/.test(location.pathname)
        },
      },
    ],
  },
  linkTranslators: {
    home: {
      en: {
        toIntl () {},
        toLocal () {
          return { pathname: `/english/home` }
        },
      },
      es: {
        toIntl () {},
        toLocal () {
          return { pathname: `/español/inicio` }
        },
      },
    },
    notFound: {
      en: {
        toIntl({ state }) {
          return state
        },
        toLocal(state) {
          return { pathname: `/english/not-found`, state }
        },
      },
      es: {
        toIntl({ state }) {
          return state
        },
        toLocal(state) {
          return { pathname: `/español/no-encontrado`, state }
        },
      },
    },
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
}