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
    return {
      redirect: true,
      match: makeInternationalMatch(language),
      from: locales[language].redirect,
    }
  }))

  routes.push(...languages.map(language => {
    const { match, languageLinkFactory } = locales[language]
    const key = `${name}.${language}`
    if (Component) {
      return <Component hidden key={key} language={language} />
    }
    return {
      match,
      renderHidden: !Component ? null : (() => (
        <Component hidden key={key} language={language} />
      )),
      render (location, hiddenChildren) {
        return <FrameComponent
          childKey={key}
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
