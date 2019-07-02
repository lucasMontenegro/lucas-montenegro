import React, { Fragment } from "react"
import i18n from "local/i18n"
import createConfig from "./createConfig"
function createMainRouter (options) {
  const config = createConfig(options)
  const {
    initialNavLocations,
    routes,
    appNames,
    translateLocationFrom,
    navLinks,
    languageLinks,
  } = config
  class MainRouter extends React.Component {
    constructor (props) {
      super(props)
      if (i18n.initialized) {
        this.state = { initializing: false }
      } else {
        this.state = { initializing: true }
        const fn = this.setInitializedCallback = () => {
          this.setState({ initializing: false })
          i18n.off(`initialized`, fn)
        }
        i18n.on(`initialized`, fn)
      }
    }
    componentWillUnmount () {
      if (this.state.initializing) {
        i18n.off(`initialized`, this.setInitializedCallback)
      }
    }
    render () {
      if (this.state.initializing) {
        return null
      }
      const { location } = this.props
      const currentRoute = routes.find(route => route.match(location))
      const oldLanguage = i18n.language
      const routeLanguage = currentRoute.language
      const userChangedLanguage = !currentRoute.isRedirect && routeLanguage !== oldLanguage
      const language = userChangedLanguage ? routeLanguage : oldLanguage
      if (userChangedLanguage) {
        i18n.changeLanguage(language)
      }
      if (!this.navLocations) {
        this.navLocations = initialNavLocations[language]
      }
      const frameProps = { language }
      const activeApp = currentRoute.name
      if (userChangedLanguage) { // translate this.navLocations
        const translate = translateLocationFrom[oldLanguage].to[language]
        this.navLocations = appNames.reduce((output, appName) => {
          if (appName === activeApp) {
            output[appName] = location
          } else {
            output[appName] = translate[appName](this.navLocations[appName])
          }
          return output
        }, {})
      } else { // just update current app location
        this.navLocations[activeApp] = location
      }
      frameProps.navLinks = navLinks[language].map(link => ({
        ...link,
        active: link.key === activeApp,
        to: this.navLocations[link.key],
      }))
      if (!currentRoute.isRedirect) {
        const translate = translateLocationFrom[language].for[activeApp]
        frameProps.languageLinks = languageLinks.map(link => ({
          ...link,
          active: link.key === language,
          to: translate[link.key](location)
        }))
      }
      return (
        <Fragment>
          {routes.map(route => (
            <route.Component
              key={route.key}
              routerProps={this.props}
              match={currentRoute === route}
              language={language}
              frameProps={frameProps}
            />
          ))}
        </Fragment>
      )
    }
  }
  return MainRouter
}
export default createMainRouter