import React, { Fragment } from "react"
import { Redirect } from "react-router"
import i18n from "local/i18n"
import mainRouterConstructor from "./mainRouterConstructor"
/*
this = {
  Frame,
  languageCode,
  matchRoot,
  locations: {
    [appName]: location,
  },
  appBodies: [
    {
      appName,
      AppBody,
    },
  ],
  routes: [
    {
      appName,
      languageCode,
      match,
    },
  ],
  translateLocationFrom: {
    [oldLanguageCode]: {
      [newLanguageCode]: {
        [appName]: function,
      },
    },
  },
  appMenus: {},
  navLinks: {
    [languageCode]: [
      { appName, text, icon },
    ],
  },
}
*/
class MainRouter extends React.Component {
  constructor (props) {
    super(props)
    mainRouterConstructor.call(this, props.options)
    if (i18n.initialized) {
      this.state = { initializing: false }
    } else {
      this.state = { initializing: true }
      const fn = this.setInitializedCallback = () => {
        const detectedLanguage = i18n.language
        if (this.languageCode !== detectedLanguage) {
          const translateFor = this.translateLocationFrom[this.languageCode][detectedLanguage]
          this.locations = this.appNames.reduce((locations, appName) => {
            locations[appName] = translateFor[appName](this.locations[appName])
            return locations
          }, {})
          this.languageCode = detectedLanguage
        }
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
    const { location } = this.props.routerProps
    const { Frame } = this
    if (this.matchRoot(location)) {
      return (
        <Fragment>
          <Redirect to={this.locations.home} />
          <Frame redirect appBodies={this.appBodies} />
        </Fragment>
      )
    }
    const route = this.routes.find(route => route.match(location))
    if (!route) {
      return (
        <Fragment>
          <Redirect to={{ ...this.locations.notFound, state: location }} />
          <Frame redirect appBodies={this.appBodies} />
        </Fragment>
      )
    }
    const { appName, languageCode } = route
    if (this.languageCode !== languageCode) {
      const activeApp = appName
      const translateFor = this.translateLocationFrom[this.languageCode][languageCode]
      this.locations = this.appNames.reduce((locations, appName) => {
        if (appName !== activeApp) {
          locations[appName] = translateFor[appName](this.locations[appName])
        }
        return locations
      }, { [activeApp]: location })
      i18n.changeLanguage(languageCode)
      this.languageCode = languageCode
    } else {
      this.locations[appName] = location
    }
    return (
      <Fragment>
        <Frame
          appName={appName}
          languageCode={languageCode}
          AppMenu={this.appMenus[appName]}
          appBodies={this.appBodies}
          locations={this.locations}
          translateLocationFrom={this.translateLocationFrom}
          navLinks={this.navLinks[languageCode]}
          routerProps={this.props.routerProps}
        />
      </Fragment>
    )
  }
}
export default MainRouter