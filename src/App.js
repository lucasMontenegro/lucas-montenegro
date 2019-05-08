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
    this.language = ``
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
    if (!this.language) {
      this.language = i18n.language
    }
    const { location } = this.props
    const currentRoute = routes.find(route => route.match(location))
    if (currentRoute.language) {
      this.language = currentRoute.language
    }
    const { language, frameProps } = this
    const activeApp = frameProps.activeApp = currentRoute.name
    const oldLanguage = frameProps.language
    const oldNavLinks = frameProps.navLinks

    // set frameProps.navLinks
    if (!oldLanguage || !oldNavLinks) { // init
      frameProps.navLinks = {
        ...initialNavLocations[language],
        [activeApp]: location
      }
    } else if (oldLanguage !== language) { // translate
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
