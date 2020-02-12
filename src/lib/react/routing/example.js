import React, { useState } from "react"
import Div from "lib/react/utils/Div"
import StringifyObject from "lib/react/utils/StringifyObject"
import languageDetector from "lib/languageDetector"
import Link from "lib/react/links/Link"
import { useRoute, useRoutingContext, RoutingProvider } from "./context"
import GetValue from "lib/react/utils/GetValue"
import HandleRedirection from "./HandleRedirection"
import routingExample from "./routingExample"
import { Route } from "react-router-dom"
function CurrentLanguage () {
  return (
    <Div color="Green">
      <h4>languageDetector.get()</h4>
      <StringifyObject id="current-language" source={languageDetector.get()} />
    </Div>
  )
}
function CurrentLocation (props) {
  return (
    <Div color="RoyalBlue">
      <h4>props.location</h4>
      <StringifyObject id="current-location" source={props.location} />
    </Div>
  )
}
function TestLinks () {
  return (
    <Div color="Orange">
      <h4>Test Links</h4>
      <ul>
        {testLinks.map(list => (
          <li key={list.title}>
            <h5>{list.title}</h5>
            <ul>
              {list.links.map(link => {
                const text = link.text || link.location.pathname
                return <li key={text}><Link to={link.location}>{text}</Link></li>
              })}
            </ul>
          </li>
        ))}
      </ul>
    </Div>
  )
}
function UseRoute () {
  const route = useRoute()
  return (
    <Div color="Purple">
      <h4>useRoute()</h4>
      <StringifyObject id="use-route" source={route} />
      {route.redirect && <div><Link to={route.redirect}>route.redirect</Link></div>}
    </Div>
  )
}
function Redirection () {
  const [enabled, saveEnabled] = useState(false)
  return (
    <Div color="Red">
      <h4>Handle Redirection</h4>
      <GetValue
        id="enable-redirection"
        value={enabled}
        onClick={() => saveEnabled(!enabled)}
      />
      {enabled ? <HandleRedirection /> : null}
    </Div>
  )
}
function ClientLinks () {
  const [count, setCount] = useState(0)
  return (
    <Div color="Yellow">
      <h4>Client Links</h4>
      <GetValue
        id="re-render-client-links"
        value={count}
        onClick={() => setCount(n => n + 1)}
      />
      <ul>
        {useRoutingContext().clientLinks.map(link => (
          <li key={link.clientName}>
            <Link to={link.location}>{link.render}</Link>
            <StringifyObject id={`${link.clientName}-client-link`} source={link} />
          </li>
        ))}
      </ul>
    </Div>
  )
}
function TranslationLinks () {
  const [links, saveLinks] = useState(null)
  const [render, setRender] = useState(true)
  const context = useRoutingContext()
  return (
    <Div color="Teal">
      <h4>Translation Links</h4>
      <GetValue
        id="render-translation-links"
        value={render}
        onClick={() => setRender(!render)}
      />
      <GetValue
        id="get-translation-links"
        value={links}
        onClick={() => saveLinks(context.translationLinks.get(render))}
      />
      <ul>
        {links && links.map(link => {
          const { languageCode } = link
          return (
            <li key={languageCode}>
              <Link to={link.location}>{link.text}</Link>
              <StringifyObject id={`${languageCode}-translation-link`} source={link} />
            </li>
          )
        })}
      </ul>
    </Div>
  )
}
function Example (props) {
  languageDetector.init(routingExample.languageCodes)
  return languageDetector.useReadyState() ? (
    <RoutingProvider
      routing={routingExample}
      location={props.location}
      clientLinks={{ home: `Home`, foo: `Foo`, notFound: `Not Found` }}
    >
      <CurrentLanguage />
      <CurrentLocation location={props.location} />
      <TestLinks />
      <UseRoute />
      <Redirection />
      <ClientLinks />
      <TranslationLinks />
    </RoutingProvider>
  ) : null
}
export default (<Route path="/react/routing" component={Example} />)
const testLinks = [
  {
    title: `Root`,
    links: [
      { location: { pathname: `/react/routing` } },
      { location: { pathname: `/react/routing/` } },
    ],
  },
  {
    title: `Language-only`,
    links: [
      { location: { pathname: `/react/routing/en` } },
      { location: { pathname: `/react/routing/en/` } },
      { location: { pathname: `/react/routing/es` } },
      { location: { pathname: `/react/routing/es/` } },
    ],
  },
  {
    title: `Home`,
    links: [
      { location: { pathname: `/react/routing/en/home/4` } },
      { location: { pathname: `/react/routing/en/home/3/` } },
      { location: { pathname: `/react/routing/es/home/4` } },
      { location: { pathname: `/react/routing/es/home/3/` } },
    ],
  },
  {
    title: `Foo`,
    links: [
      { location: { pathname: `/react/routing/en/foo/1` } },
      { location: { pathname: `/react/routing/en/foo/6/` } },
      { location: { pathname: `/react/routing/es/foo/1` } },
      { location: { pathname: `/react/routing/es/foo/6/` } },
    ],
  },
  {
    title: `Not Found`,
    links: [
      { location: { pathname: `/react/routing/en/notFound` } },
      { location: { pathname: `/react/routing/en/notFound/` } },
      {
        text: `/react/routing/en/notFound with state`,
        location: {
          pathname: `/react/routing/en/notFound`,
          state: { pathname: `/react/routing/404` },
        },
      },
      { location: { pathname: `/react/routing/es/notFound` } },
      { location: { pathname: `/react/routing/es/notFound/` } },
      {
        text: `/react/routing/es/notFound with state`,
        location: {
          pathname: `/react/routing/es/notFound`,
          state: { pathname: `/react/routing/404` },
        },
      },
    ],
  },
  {
    title: `Unknown Client`,
    links: [
      { location: { pathname: `/react/routing/en/404` } },
      { location: { pathname: `/react/routing/es/404` } },
    ],
  },
  {
    title: `No Match`,
    links: [
      { location: { pathname: `/react/routing/404` } },
      { location: { pathname: `/react/routing/pt/foo` } },
    ],
  },
]