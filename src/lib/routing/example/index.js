import React, { useState } from "react"
import { Route, Link } from "react-router-dom"
import Div from "lib/utils/react/Div"
import StringifyObject from "lib/utils/react/StringifyObject"
import GetValue from "lib/utils/react/GetValue"
import CreateDestroy from "lib/utils/react/CreateDestroy"
import Navigation from "lib/utils/react/Navigation"
import Router from "lib/routing/Router"
import ClientNavigator from "lib/routing/ClientNavigator"
import LinkTranslator from "lib/routing/LinkTranslator"
import routingExample from "lib/routing/example/routingExample"
class Client {
  constructor (clientName, routing) {
    this.clientName = clientName
    this.navigator = new ClientNavigator(clientName, routing)
    this.linkTranslator = new LinkTranslator(clientName, routing)
  }
  Component = ({ active, location }) => {
    const clientLocation = this.navigator.useClientLocation(active, location)
    const getLinks = this.linkTranslator.useTranslated(clientLocation)
    const [links, saveLinks] = useState(null)
    return (
      <Div className={this.clientName} color="PaleVioletRed">
        <h5><em>{this.clientName}</em> Client</h5>
        <Div className="navigator">
          <h6>Client Location</h6>
          <Link className="link" to={clientLocation}>link</Link>
          <StringifyObject className="location" source={clientLocation} />
        </Div>
        <Div className="link-translator">
          <h6>Translated Links</h6>
          {links && (
            <ul className="links">
              {links.map(({ key, text, location }) => (
                <li key={key}><Link className={key} to={location}>{text}</Link></li>
              ))}
            </ul>
          )}
          <GetValue
            className="locations"
            value={links}
            onClick={() => saveLinks(getLinks())}
          />
        </Div>
      </Div>
    )
  }
}
const home = new Client(`home`, routingExample)
const foo = new Client(`foo`, routingExample)
const notFound = new Client(`notFound`, routingExample)
function App ({ location, router }) {
  const route = router.useRoute(location)
  return (
    <Div id="routing-example" color="SeaGreen">
      <h4>Example App</h4>
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
      <CreateDestroy
        Component={home.Component}
        props={{ active: route.render.home, location }}
      />
      <CreateDestroy
        Component={foo.Component}
        props={{ active: route.render.foo, location }}
      />
      <CreateDestroy
        Component={notFound.Component}
        props={{ active: route.render.notFound, location }}
      />
    </Div>
  )
}
function Example ({ location }) {
  const router = new Router(routingExample)
  return <CreateDestroy Component={App} props={{ location, router }} />
}
export default (<Route path="/routing" component={Example} />)