import React, { Fragment } from "react"
import { Redirect } from "react-router"
import i18n from "local/i18n"
import Frame from "local/Frame"
import mainRouterConstructor from "./mainRouterConstructor"
/*
this = {
  languageCode,
  matchRoot,
  locations: {
    [appName]: {
      original,
      translations: {
        [languageCode]: location,
      },
    },
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
  makeNotFoundLocation,
  translate: {
    [appName]: {
      [oldLanguageCode]: {
        [newLanguageCode]: function,
      },
    },
  },
  languageCodes,
  appMenus: {},
  navLinks: {
    [languageCode]: [
      { appName, text, icon },
    ],
  },
  languageLinks: [
    { languageCode, text },
  ],
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
    if (!this.languageCode) {
      this.languageCode = i18n.language
    }
    const { location } = this.props.routerProps
    if (this.matchRoot(location)) {
      return (
        <Fragment>
          <Redirect to={this.locations.home.translations[this.languageCode]} />
          <Frame redirect appBodies={this.appBodies} />
        </Fragment>
      )
    }
    const route = this.routes.find(route => route.match(location))
    if (!route) {
      return (
        <Fragment>
          <Redirect to={this.makeNotFoundLocation(this.languageCode, location)} />
          <Frame redirect appBodies={this.appBodies} />
        </Fragment>
      )
    }
    const { appName, languageCode } = route
    if (this.languageCode !== languageCode) {
      i18n.changeLanguage(this.languageCode = languageCode)
    }
    const translatedLocation = this.locations[appName]
    if (translatedLocation.original !== location) {
      translatedLocation.original = location
      const translateTo = this.translate[appName][this.languageCode]
      translatedLocation.translations = this.languageCodes.reduce((translations, languageCode) => {
        translations[languageCode] = translateTo[languageCode](location)
        return translations
      }, {})
    }
    return (
      <Fragment>
        <Frame
          appName={appName}
          languageCode={languageCode}
          AppMenu={this.appMenus[appName]}
          appBodies={this.appBodies}
          navLinks={this.navLinks[languageCode].map(({ appName, text }) => ({
            key: appName,
            text,
            to: this.locations[appName].translations[languageCode],
          }))}
          languageLinks={this.languageLinks.map(({ languageCode, text }) => ({
            key: languageCode,
            text,
            to: this.locations[appName].translations[languageCode],
          }))}
          routerProps={this.props.routerProps}
        />
      </Fragment>
    )
  }
}
export default MainRouter