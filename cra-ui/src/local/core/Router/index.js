import React, { Fragment } from "react"
import { Redirect } from "react-router"
import i18n from "local/i18n"
/*
props = {
  location,
  Component,
  routing: {
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
        appName,
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
  },
}
*/
class Router extends React.Component {
  constructor (props) {
    super(props)
    if (i18n.isInitialized) {
      this.languageCode = i18n.language
      this.state = { initializing: false }
    } else {
      this.state = { initializing: true }
      const fn = this.initCallback = () => {
        this.languageCode = i18n.language
        this.setState({ initializing: false })
        i18n.off(`initialized`, fn)
      }
      i18n.on(`initialized`, fn)
    }
  }
  componentWillUnmount () {
    if (this.state.initializing) {
      i18n.off(`initialized`, this.initCallback)
    }
  }
  changeLanguage (languageCode) {
    if (languageCode !== this.languageCode) {
      this.languageCode = languageCode
    }
    if (languageCode !== i18n.language) {
      i18n.changeLanguage(languageCode)
    }
  }
  render () {
    if (this.state.initializing) {
      return null
    }
    const { location, Component, routing } = this.props
    let redirectLocation = null, appName = null
    if (routing.matchRoot(location)) {
      redirectLocation = routing.locations.home[this.languageCode]
    } else {
      const route = routing.routes.find(r => r.match(location))
      if (route) {
        this.changeLanguage(route.languageCode)
        ;({ appName } = route)
      } else {
        const languageRoot = routing.languageRoutes.root.find(r => r.match(location))
        if (languageRoot) {
          this.changeLanguage(languageRoot.languageCode)
          redirectLocation = routing.locations.home[this.languageCode]
        } else {
          const languageNotFound = routing.languageRoutes.notFound.find(r => r.match(location))
          if (languageNotFound) {
            this.changeLanguage(languageNotFound.languageCode)
          }
          redirectLocation = {
            ...routing.locations.notFound[this.languageCode],
            state: { referrer: location },
          }
        }
      }
    }
    return (
      <Fragment>
        {redirectLocation && <Redirect to={redirectLocation} />}
        <Component
          appName={appName}
          languageCode={this.languageCode}
          location={location}
        />
      </Fragment>
    )
  }
}
export default Router