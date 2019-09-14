/*
routing = {
  matchRoot,
  locations: {
    home: {
      [languageCode]: location,
    },
    notFound: {
      [languageCode]: location,
    },
  }
  routes: [
    {
      clientName,
      languageCode,
      match,
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode,
        match,
      },
    ],
    notFound: [
      {
        languageCode,
        match,
      },
    ],
  },
}
*/
function find (location, routes) {
  return routes.find(r => r.match(location))
}
function makeNotFoundRedirect (routing, languageCode, referrer) {
  return {
    type: `redirect`,
    languageCode,
    location: {
      ...routing.locations.notFound[languageCode],
      state: referrer,
    },
  }
}
function makeHomeRedirect (routing, languageCode) {
  return {
    type: `redirect`,
    languageCode,
    location: routing.locations.home[languageCode],
  }
}
export default function findRoute (routing, location, detectedLanguage, setDetectedLanguage) {
  if (routing.matchRoot(location)) {
    return makeHomeRedirect(routing, detectedLanguage)
  }
  {
    const route = find(location, routing.routes)
    if (route) {
      const { languageCode, clientName } = route
      setDetectedLanguage(languageCode)
      return { type: `client`, languageCode, clientName, location }
    }
  }
  {
    const route = find(location, routing.languageRoutes.root)
    if (route) {
      const { languageCode } = route
      setDetectedLanguage(languageCode)
      return makeHomeRedirect(routing, languageCode)
    }
  }
  {
    const route = find(location, routing.languageRoutes.notFound)
    if (route) {
      const { languageCode } = route
      setDetectedLanguage(languageCode)
      return makeNotFoundRedirect(routing, languageCode, location)
    }
  }
  return makeNotFoundRedirect(routing, detectedLanguage, location)
}