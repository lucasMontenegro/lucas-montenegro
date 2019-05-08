import React, { Fragment } from "react"
import i18n from "i18next"
import Frame from "./Frame"
import config from "./config"

const {
  appNames,
  routes,
  navLinks,
  translateLocationFrom,
} = config

const initialNavLocations = navLinks.initialLocations

class App extends React.Component {
  constructor (props) {
    super(props)
    this.frameProps = {}
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
    const userChangedLanguage = routeLanguage && routeLanguage !== oldLanguage
    const language = userChangedLanguage ? routeLanguage : oldLanguage
    if (userChangedLanguage) {
      i18n.changeLanguage(language)
    }

    const { frameProps } = this
    const activeApp = frameProps.activeApp = currentRoute.name
    const oldNavLinks = frameProps.navLinks

    // set frameProps.navLinks
    if (!oldNavLinks) { // init
      frameProps.navLinks = {
        ...initialNavLocations[language],
        [activeApp]: location
      }
    } else if (userChangedLanguage) { // translate
      const translate = translateLocationFrom[oldLanguage].to[language]
      frameProps.navLinks = appNames.reduce((output, appName) => {
        if (appName === activeApp) {
          output[appName] = location
        } else {
          output[appName] = translate[appName](oldNavLinks[appName])
        }
        return output
      }, {})
    } else { // just update app location
      oldNavLinks[activeApp] = location
    }

    frameProps.language = language
    frameProps.location = location

    return (
      <Fragment>
        {routes.map(route => (
          <route.Component
            key={route.key}
            routerProps={this.props}
            match={currentRoute === route}
            language={language}
            Frame={Frame}
            frameProps={frameProps}
          />
        ))}
      </Fragment>
    )
  }
}

export default App
