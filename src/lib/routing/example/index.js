import React, { useState, useMemo } from "react"
import { Route, Link } from "react-router-dom"
import languageDetector from "lib/languageDetector"
import Router from "lib/routing/Router"
import ClientNavigator from "lib/routing/ClientNavigator"
import LinkTranslator from "lib/routing/LinkTranslator"
import routingExample from "lib/routing/example/routingExample"
import Div from "lib/utils/react/Div"
import StringifyObject from "lib/utils/react/StringifyObject"
import GetValue from "lib/utils/react/GetValue"
import CreateDestroy from "lib/utils/react/CreateDestroy"
import Navigation from "lib/utils/react/Navigation"
class Client {
  constructor (clientName, routing, exampleLocations) {
    this.clientName = clientName
    this.exampleLocations = exampleLocations
    this.navigator = new ClientNavigator(clientName, routing)
    this.linkTranslator = new LinkTranslator(clientName, routing)
  }
  use (active, location) {
    const clientLocation = this.navigator.useClientLocation(active, location)
    const getLinks = this.linkTranslator.useTranslated(clientLocation)
    const [links, saveLinks] = useState(null)
    return {
      exampleLinks: useMemo(() => {
        console.log(`${this.clientName}.exampleLinks`)
        return (
          <li key={this.clientName}>
            <Div className={this.clientName} color="SandyBrown">
              <h6><em>{this.clientName}</em> Client</h6>
              <ul>
                {this.exampleLocations.map((location, i) => {
                  const name = `link-${i}`
                  return <li key={name}><Link className={name} to={location}>Link {i}</Link></li>
                })}
              </ul>
            </Div>
          </li>
        )
      }, []),
      clientLocation: useMemo(() => {
        console.log(`${this.clientName}.clientLocation`)
        return (
          <li key={this.clientName}>
            <Div className={this.clientName} color="PaleVioletRed">
              <h6><em>{this.clientName}</em> Client</h6>
              <Link className="link" to={clientLocation}>link</Link>
              <StringifyObject className="location" source={clientLocation} />
            </Div>
          </li>
        )
      }, [clientLocation]),
      translatedLinks: useMemo(() => {
        console.log(`${this.clientName}.translatedLinks`)
        return (
          <li key={this.clientName}>
            <Div className={this.clientName} color="LightSeaGreen">
              <h6><em>{this.clientName}</em> Client</h6>
              {links && (
                <ul className="links">
                  {links.map(({ location, otherProps }) => {
                    if (location) {
                      return (
                        <li key={otherProps.key}>
                          <Link className={otherProps.id} to={location}>
                            {otherProps.text}
                          </Link>
                        </li>
                      )
                    }
                    return <li key={otherProps.key}>{otherProps.text}</li>
                  })}
                </ul>
              )}
              <GetValue
                className="locations"
                value={links}
                onClick={() => saveLinks(getLinks())}
              />
            </Div>
          </li>
        )
      }, [getLinks, links, saveLinks]),
    }
  }
}
const router = new Router(routingExample)
const homeClient = new Client(`home`, routingExample, [
  { pathname: `/routing/en/home` },
  { pathname: `/routing/en/home/` },
  { pathname: `/routing/es/home` },
  { pathname: `/routing/es/home/` },
])
const fooClient = new Client(`foo`, routingExample, [
  { pathname: `/routing/en/foo/2` },
  { pathname: `/routing/en/foo/2/` },
  { pathname: `/routing/en/foo/7` },
  { pathname: `/routing/en/foo/7/` },
  { pathname: `/routing/es/foo/2` },
  { pathname: `/routing/es/foo/2/` },
  { pathname: `/routing/es/foo/7` },
  { pathname: `/routing/es/foo/7/` },
])
const notFoundClient = new Client(`notFound`, routingExample, [
  { pathname: `/routing/en/notFound` },
  { pathname: `/routing/en/notFound/` },
  { pathname: `/routing/es/notFound` },
  { pathname: `/routing/es/notFound/` },
  { pathname: `/routing/en/notFound`, state: { pathname: `/routing/404` } },
  { pathname: `/routing/en/notFound/`, state: { pathname: `/routing/404` } },
  { pathname: `/routing/es/notFound`, state: { pathname: `/routing/404` } },
  { pathname: `/routing/es/notFound/`, state: { pathname: `/routing/404` } },
])
function App ({ location }) {
  console.log(`App start`)
  const route = router.useRoute(location)
  const home = homeClient.use(route.render.home, location)
  const foo = fooClient.use(route.render.foo, location)
  const notFound = notFoundClient.use(route.render.notFound, location)
  const [count, saveCount] = useState(0)
  const result = (
    <Div id="routing-example" color="SeaGreen">
      <h4>Example App</h4>
      <GetValue
        className="count"
        value={count}
        onClick={() => saveCount(count => count + 1)}
      />
      <Navigation initialUrl="/routing" />
      <Div className="current-location">
        <h5>Current Location</h5>
        <Link className="link" to={location}>link</Link>
        <StringifyObject className="location" source={location} />
      </Div>
      <Div className="route">
        <h5>Route</h5>
        <Div>
          <h6>Render Object</h6>
          <StringifyObject className="render" source={route.render} />
        </Div>
        <Div className="redirect">
          <h6>Redirect Location</h6>
          {route.redirect && <Link className="link" to={route.redirect}>link</Link>}
          <StringifyObject className="location" source={route.redirect} />
        </Div>
      </Div>
      <Div className="example-links">
        <h5>Example Links</h5>
        <Div>
          <h6>Clients</h6>
          <ul className="clients">
            {home.exampleLinks}
            {foo.exampleLinks}
            {notFound.exampleLinks}
          </ul>
        </Div>
      </Div>
      <Div className="client-locations">
        <h5>Client Locations</h5>
        <ul>
          {home.clientLocation}
          {foo.clientLocation}
          {notFound.clientLocation}
        </ul>
      </Div>
      <Div className="translated-links">
        <h5>Translated Links</h5>
        <ul>
          {home.translatedLinks}
          {foo.translatedLinks}
          {notFound.translatedLinks}
        </ul>
      </Div>
    </Div>
  )
  console.log(`App end`)
  return result
}
function Init (props) {
  languageDetector.init(routingExample.languageCodes)
  const ready = languageDetector.useReadyState()
  if (ready) {
    return <App location={props.location} />
  }
  return null
}
function Example (props) {
  return <CreateDestroy Component={Init} props={props} />
}
export default (<Route path="/routing" component={Example} />)