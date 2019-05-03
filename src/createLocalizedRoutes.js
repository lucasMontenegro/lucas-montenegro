import React from "react"

export default opts => {
  const routes = []
  const {
    name,
    makeInternationalMatch,
    locales,
    Component,
    FrameComponent,
  } = opts
  const languages = Object.keys(locales)

  // redirect from internationalized route to the localized one
  routes.push(...languages.map(language => {
    const { redirect } = locales[language]
    return {
      match: makeInternationalMatch(language),
      render (location, hiddenChildren) {
        return <FrameComponent
          redirect
          frameProps={{ hiddenChildren, to: redirect(location) }}
        />
      },
    }
  }))

  if (Component) {
    routes.push({
      name,
      match (location) {
        return false
      },
      renderHidden() {
        return <Component hidden key={name} />
      },
    })
  }

  routes.push(...languages.map(language => {
    const { match, languageLinkFactory } = locales[language]
    return {
      name,
      match,
      render (location, hiddenChildren) {
        return <FrameComponent
          childKey={name}
          language={language}
          navProps={{
            language,
            location,
            languageLinks: languages.map(languageLinkFactory(location, locales)),
          }}
          frameProps={{ hiddenChildren }}
        />
      },
    }
  }))

  return routes
}
