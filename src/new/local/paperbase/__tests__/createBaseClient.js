import React, { Fragment } from "react"
import renderer from "react-test-renderer"
function Divs ({ keys, values }) {
  return <Fragment>{keys.map(key => <div key={key}>{values[key]}</div>)}</Fragment>
}
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
jest.mock(`new/local/paperbase/themes/light`, () => ({ __esModule: true, default: `lightTheme` }))
jest.mock(`new/local/paperbase/themes/dark`, () => ({ __esModule: true, default: `darkTheme` }))
jest.mock(`new/local/paperbase/Body`, () => ({ __esModule: true, default: jest.fn() }))
import Body from "new/local/paperbase/Body"
Body.mockImplementation(function Body (props) {
  return (
    <div className="body">
      <Divs
        keys={[
          `languageCode`,
          `drawerWidth`,
          `viewState`,
          `logo`,
          `titles`,
          `subtitles`,
          `primaryToolbar`,
          `secondaryToolbar`,
          `children`,
        ]}
        values={props}
      />
      {props.responsiveToolbar}
    </div>
  )
})
jest.mock(`new/local/paperbase/portals`, () => ({ __esModule: true, createBluePortal: jest.fn() }))
import { createBluePortal } from "new/local/paperbase/portals"
createBluePortal.mockImplementation(function createBluePortal (name) {
  return function BluePortal (props) {
    return (
      <div className="blue-portal">
        <div>{name}</div>
        <div>{props.children}</div>
      </div>
    )
  }
})
jest.mock(`new/local/paperbase/LanguageDialog`, () => ({ __esModule: true, default: jest.fn() }))
import LanguageDialog from "new/local/paperbase/LanguageDialog"
LanguageDialog.mockImplementation(function LanguageDialog ({ state }) {
  const { clientLocation } = state
  return (
    <div className="language-dialog">
      <Divs keys={[`initialLocation`, `linkTranslators`, `languageCode`]} values={state} />
      <div className="client-location">
        <Divs
          keys={[
            `initialLocation`,
            `linkTranslators`,
            `forwardLocation`,
            `match`,
            `languageCode`,
            `location`,
          ]}
          values={clientLocation}
        />
      </div>
    </div>
  )
})
jest.mock(`new/local/paperbase/makeLanguageDialogState`, () => ({ __esModule: true, default: jest.fn() }))
import makeLanguageDialogState from "new/local/paperbase/makeLanguageDialogState"
makeLanguageDialogState.mockImplementation(
  function makeLanguageDialogState ({ initialLocation, linkTranslators }) {
    return function useLanguageDialogState (languageCode, clientLocation) {
      return {
        initialLocation,
        linkTranslators,
        languageCode,
        clientLocation,
      }
    }
  }
)
jest.mock(`new/local/paperbase/NavLink`, () => ({ __esModule: true, default: jest.fn() }))
import NavLink from "new/local/paperbase/NavLink"
NavLink.mockImplementation(function NavLink (props) {
  const { location } = props
  return (
    <div className="nav-link">
      <Divs keys={[`active`, `languageCode`, `labels`, `icons`]} values={props} />
      <div className="client-location">
        <Divs
          keys={[
            `initialLocation`,
            `linkTranslators`,
            `forwardLocation`,
            `match`,
            `languageCode`,
            `location`,
          ]}
          values={location}
        />
      </div>
    </div>
  )
})
jest.mock(`new/local/paperbase/makeClientLocation`, () => ({
  __esModule: true,
  default: jest.fn(),
}))
import makeClientLocation from "new/local/paperbase/makeClientLocation"
makeClientLocation.mockImplementation(
  function makeClientLocation ({ initialLocation, linkTranslators, forwardLocation }) {
    return function useClientLocation (match, languageCode, location) {
      return {
        initialLocation,
        linkTranslators,
        forwardLocation,
        match,
        languageCode,
        location,
      }
    }
  }
)
import createBaseClient from "new/local/paperbase/createBaseClient"
describe(`new/local/paperbase/createBaseClient`, () => {
  const options = {
    clientName: `clientName`,
    appName: `appName`,
    initialLocation: `initialLocation`,
    linkTranslators: `linkTranslators`,
    customClientLocation: `customClientLocation`,
  }
  it(`should create the BaseClient component`, () => {
    const BaseClient = createBaseClient(options)
    expect(BaseClient).toBeInstanceOf(Function)
    expect(BaseClient.name).toBe(`BaseClient`)
    expect(createBluePortal.mock.calls.length).toBe(2)
    expect(makeLanguageDialogState.mock.calls.length).toBe(1)
    expect(makeClientLocation.mock.calls.length).toBe(1)
  })
  it(`should render`, () => {
    const BaseClient = createBaseClient(options)
    delete BaseClient.propTypes
    const actual = renderer.create(
      <BaseClient
        match="match"
        languageCode="languageCode"
        location="location"
        viewState="viewState"
        drawerWidth="drawerWidth"
        logo="logo"
        titles="titles"
        subtitles="subtitles"
        icons="icons"
        primaryToolbar="primaryToolbar"
        secondaryToolbar="secondaryToolbar"
        responsiveToolbar={<div>responsiveToolbar</div>}
        drawerContent="drawerContent"
      >
        children
      </BaseClient>
    ).toJSON()
    const expected = renderer.create(
      <Fragment>
        <div className="theme-provider">
          <div>lightTheme</div>
          <div className="body">
            <div>languageCode</div>
            <div>drawerWidth</div>
            <div>viewState</div>
            <div>logo</div>
            <div>titles</div>
            <div>subtitles</div>
            <div>primaryToolbar</div>
            <div>secondaryToolbar</div>
            <div>children</div>
            <div>responsiveToolbar</div>
            <div className="language-dialog">
              <div>initialLocation</div>
              <div>linkTranslators</div>
              <div>languageCode</div>
              <div className="client-location">
                <div>initialLocation</div>
                <div>linkTranslators</div>
                <div>customClientLocation</div>
                <div>match</div>
                <div>languageCode</div>
                <div>location</div>
              </div>
            </div>
          </div>
        </div>
        <div className="theme-provider">
          <div>darkTheme</div>
          <div className="blue-portal">
            <div>appName &gt; clientName &gt; DrawerContent</div>
            <div>drawerContent</div>
          </div>
          <div className="blue-portal">
            <div>appName &gt; clientName &gt; ClientLink</div>
            <div>
              <div className="nav-link">
                <div>match</div>
                <div>languageCode</div>
                <div>subtitles</div>
                <div>icons</div>
                <div className="client-location">
                  <div>initialLocation</div>
                  <div>linkTranslators</div>
                  <div>customClientLocation</div>
                  <div>match</div>
                  <div>languageCode</div>
                  <div>location</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    ).toJSON()
    expect(actual).toEqual(expected)
  })
})