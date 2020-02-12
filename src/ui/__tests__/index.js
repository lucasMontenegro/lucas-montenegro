import languageDetector from "lib/languageDetector"
import ReactDOM from "react-dom"
import { Route } from "react-router-dom"
import renderer from "react-test-renderer"
import React from "react"
import ui from "../index.js"
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { init: () => {}, useReadyState: jest.fn() },
}))
jest.mock(`lib/react/fontAwesome`, () => {
  const React = jest.requireActual(`react`)
  return {
    __esModule: true,
    FontAwesomeIcon: props => <i {...props} className="FontAwesomeIcon" />,
  }
})
jest.mock(`lib/react/routing/context`, () => {
  const React = jest.requireActual(`react`)
  function RoutingProvider (props) {
    const { clientLinks } = props
    return (
      <div className="RoutingProvider">
        <ul className="clientLinks">
          {Object.keys(clientLinks).map(clientName => {
            const { Icon, text } = clientLinks[clientName]
            return (
              <li key={clientName} className={clientName}>
                <Icon />
                <ul className="translation">
                  {Object.keys(text).map(languageCode => (
                    <li key={languageCode} className={languageCode}>{text[languageCode]()}</li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
        <div className="children">
          {props.children}
        </div>
      </div>
    )
  }
  return { __esModule: true, RoutingProvider }
})
jest.mock(`../routing`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/react/routing/HandleRedirection`, () => {
  const React = jest.requireActual(`react`)
  function HandleRedirection () {
    return <div className="HandleRedirection" />
  }
  return { __esModule: true, default: HandleRedirection }
})
jest.mock(`lib/react/Dashboard`, () => {
  const React = jest.requireActual(`react`)
  return { __esModule: true, default: props => <div {...props} className="Dashboard" /> }
})
jest.mock(`lib/Home`, () => {
  const React = jest.requireActual(`react`)
  function Home () {
    return <div className="Home" />
  }
  return { __esModule: true, default: Home }
})
jest.mock(`lib/NotFound`, () => {
  const React = jest.requireActual(`react`)
  function NotFound () {
    return <div className="NotFound" />
  }
  return { __esModule: true, default: NotFound }
})
jest.mock(`react-dom`, () => ({
  __esModule: true,
  default: { render: jest.fn() },
}))
jest.mock(`lib/react/DarkMode`, () => {
  const React = jest.requireActual(`react`)
  function DarkMode (props) {
    return <div className="DarkMode">{props.children}</div>
  }
  return { __esModule: true, default: DarkMode }
})
jest.mock(`lib/react/Theme`, () => {
  const React = jest.requireActual(`react`)
  function Theme (props) {
    return <div className="Theme">{props.children}</div>
  }
  return { __esModule: true, default: Theme }
})
jest.mock(`lib/react/CssBaseline`, () => {
  const React = jest.requireActual(`react`)
  function CssBaseline () {
    return <div className="CssBaseline" />
  }
  return { __esModule: true, default: CssBaseline }
})
jest.mock(`react-router-dom`, () => {
  const React = jest.requireActual(`react`)
  function BrowserRouter (props) {
    return <div className="BrowserRouter">{props.children}</div>
  }
  const Route = jest.fn(function Route () {
    return <div className="Route" />
  })
  return { __esModule: true, BrowserRouter, Route }
})
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { document: { getElementById: () => {} } },
}))
describe(`../index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`, `react-dom`, `react-router-dom`])).toMatchSnapshot()
  })
  it(`should render`, () => {
    const html = renderer.create(ReactDOM.render.mock.calls[0][0])
    expect(html.toJSON()).toMatchSnapshot()
  })
  describe.each([[true], [false]])(`<App /> (language detector ready %j)`, ready => {
    let result
    beforeAll(() => {
      languageDetector.useReadyState.mockReturnValueOnce(ready)
      const App = Route.mock.calls[0][0].component
      result = renderer.create(<App />).toJSON()
    })
    it(`should render`, () => {
      expect(result).toMatchSnapshot()
    })
  })
})