import React, { Fragment } from "react"
import renderer from "react-test-renderer"

jest.mock(`@material-ui/styles`, () => ({
  __esModule: true,
  ThemeProvider (props) {
    return (
      <div className="theme-provider">
        <div>{props.theme}</div>
        {props.children}
      </div>
    )
  },
}))

jest.mock(`new/local/paperbase/themes/dark`, () => ({ __esModule: true, default: `darkTheme` }))

jest.mock(`new/local/paperbase/makeRouter`, () => ({ __esModule: true, default: jest.fn() }))
import makeRouter from "new/local/paperbase/makeRouter"
makeRouter.mockImplementation(
  function makeRouter (routing) {
    return function useRouter (match) { // just pass the match object for testing
      return match
    }
  }
)

jest.mock(`new/local/paperbase/HandleRedirect`, () => ({
  __esModule: true,
  default: function HandleRedirect (props) {
    return (
      <div className="handle-redirect">
        <div className="match-type">{props.match.type}</div>
        <div>{props.children}</div>
      </div>
    )
  },
}))

jest.mock(`new/local/paperbase/useViewState`, () => ({
  __esModule: true,
  default: function useViewState (mobileBreakpoint) {
    return mobileBreakpoint
  },
}))

jest.mock(`new/local/paperbase/Drawer`, () => ({
  __esModule: true,
  default: function Drawer (props) {
    return (
      <div className="drawer">
        {[`languageCode`, `width`, `viewState`].map(key => <div key={key}>{props[key]}</div>)}
        <div className="nav-links">{props.navLinks}</div>
        <div className="drawer-content">{props.children}</div>
      </div>
    )
  },
}))

jest.mock(`new/local/paperbase/portals`, () => ({ __esModule: true, createRedPortal: jest.fn() }))
import { createRedPortal } from "new/local/paperbase/portals"
createRedPortal.mockImplementation(function createRedPortal (name) {
  return function RedPortal (props) {
    return (
      <div className="red-portal">
        <div>{name}</div>
        <div>{props.Component}</div>
      </div>
    )
  }
})

jest.mock(`new/local/paperbase/BareLi`, () => ({ __esModule: true, default: `BareLi` }))

const clientNames = [`foo`, `bar`, `baz`]
const options = {
  clients: clientNames.reduce((clients, name) => {
    clients[name] = function Client (props) {
      return (
        <div className={`client ${name}`}>
          <div>{JSON.stringify(props.match)}</div>
          <div>{props.languageCode}</div>
          <div className="location-type">{props.location.type}</div>
          <div>{props.viewState}</div>
          <div>{props.drawerWidth}</div>
          <div>{props.logo}</div>
          <div>{props.titles}</div>
        </div>
      )
    }
    return clients
  }, {}),
  routing: `routing`,
  logo: `logo`,
  titles: `titles`,
}

import createApp from "new/local/paperbase/createApp"
describe(`new/local/paperbase/createApp`, () => {
  it(`should create the App component`, () => {
    const App = createApp({ ...options, name: `name1` })
    expect(App).toBeInstanceOf(Function)
    expect(App.name).toBe(`App`)
    expect(createRedPortal.mock.calls.length).toBe(6)
    expect(makeRouter.mock.calls.length).toBe(1)
    expect(makeRouter.mock.calls[0][0]).toBe(`routing`)
  })
  it(`should detect duplicated app names`, () => {
    const options2 = { ...options, name: `name2` }
    createApp(options2)
    expect(() => createApp(options2)).toThrow(`Duplicated App name: name2`)
  })
  it(`should redirect`, () => {
    const App = createApp({ ...options, name: `name3` })
    const actual = renderer.create(
      <App location={{ type: `redirect`, languageCode: `languageCode` }} />
    ).toJSON()
    const clientChildren = (
      <Fragment>
        <div>false</div>
        <div>languageCode</div>
        <div className="location-type">
          redirect{/* location === match during testing */}
        </div>
        <div>100</div>{/* viewState === mobileBreakpoint === 100 */}
        <div>256</div>{/* drawerWidth === 256 */}
        <div>logo</div>
        <div>titles</div>
      </Fragment>
    )
    const expected = renderer.create(
      <div className="handle-redirect">
        <div className="match-type">redirect</div>
        <div>
          <div className="client foo">{clientChildren}</div>
          <div className="client bar">{clientChildren}</div>
          <div className="client baz">{clientChildren}</div>
          <div className="theme-provider">
            <div>darkTheme</div>
            <div className="drawer">
              <div>languageCode</div>
              <div>256</div>
              <div>100</div>
              <div className="nav-links">
                <div className="red-portal">
                  <div>name3 &gt; foo &gt; ClientLink</div>
                  <div>BareLi</div>
                </div>
                <div className="red-portal">
                  <div>name3 &gt; bar &gt; ClientLink</div>
                  <div>BareLi</div>
                </div>
                <div className="red-portal">
                  <div>name3 &gt; baz &gt; ClientLink</div>
                  <div>BareLi</div>
                </div>
              </div>
              <div className="drawer-content">
                <div className="red-portal">
                  <div>name3 &gt; foo &gt; DrawerContent</div>
                  <div>div</div>
                </div>
                <div className="red-portal">
                  <div>name3 &gt; bar &gt; DrawerContent</div>
                  <div>div</div>
                </div>
                <div className="red-portal">
                  <div>name3 &gt; baz &gt; DrawerContent</div>
                  <div>div</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ).toJSON()
    expect(actual).toEqual(expected)
  })
  it(`should match clients`, () => {
    const App = createApp({ ...options, name: `name4` })
    const actual = renderer.create(
      <App location={{ type: `client`, clientName: `bar`, languageCode: `languageCode` }} />
    ).toJSON()
    const clientChildren = (
      <Fragment>
        <div>languageCode</div>
        <div className="location-type">
          client{/* location === match during testing */}
        </div>
        <div>100</div>{/* viewState === mobileBreakpoint === 100 */}
        <div>256</div>{/* drawerWidth === 256 */}
        <div>logo</div>
        <div>titles</div>
      </Fragment>
    )
    const expected = renderer.create(
      <div className="handle-redirect">
        <div className="match-type">client</div>
        <div>
          <div className="client foo">
            <div>false</div>
            {clientChildren}
          </div>
          <div className="client bar">
            <div>true</div>
            {clientChildren}
          </div>
          <div className="client baz">
            <div>false</div>
            {clientChildren}
          </div>
          <div className="theme-provider">
            <div>darkTheme</div>
            <div className="drawer">
              <div>languageCode</div>
              <div>256</div>
              <div>100</div>
              <div className="nav-links">
                <div className="red-portal">
                  <div>name4 &gt; foo &gt; ClientLink</div>
                  <div>BareLi</div>
                </div>
                <div className="red-portal">
                  <div>name4 &gt; bar &gt; ClientLink</div>
                  <div>BareLi</div>
                </div>
                <div className="red-portal">
                  <div>name4 &gt; baz &gt; ClientLink</div>
                  <div>BareLi</div>
                </div>
              </div>
              <div className="drawer-content">
                <div className="red-portal">
                  <div>name4 &gt; foo &gt; DrawerContent</div>
                  <div>div</div>
                </div>
                <div className="red-portal">
                  <div>name4 &gt; bar &gt; DrawerContent</div>
                  <div>div</div>
                </div>
                <div className="red-portal">
                  <div>name4 &gt; baz &gt; DrawerContent</div>
                  <div>div</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ).toJSON()
    expect(actual).toEqual(expected)
  })
})