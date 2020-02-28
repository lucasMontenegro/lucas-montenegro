import { makeStyles } from "@material-ui/core/styles"
import { useAuth0 } from "lib/react/auth0"
import Button from "@material-ui/core/Button"
import renderer from "react-test-renderer"
import React from "react"
jest.mock(`@material-ui/core/styles`, () => ({ __esModule: true, makeStyles: jest.fn() }))
let paletteType
function mockPaletteType (mode) {
  paletteType = mode
}
makeStyles.mockImplementation((styles, options) => () => {
  const classes = styles({
    spacing: n => 8*n,
    palette: {
      type: paletteType,
      primary: { main: `theme.palette.primary.main` },
    },
  })
  return Object.keys(classes).reduce((obj, key) => {
    obj[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
    return obj
  }, {})
})
jest.mock(`lib/react/auth0`, () => ({ __esModule: true, useAuth0: jest.fn() }))
jest.mock(`lib/react/useTranslation`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: () => source => (
      <div className="translation">
        {Object.keys(source).map(languageCode => (
          <div key={languageCode} className={languageCode}>{source[languageCode]()}</div>
        ))}
      </div>
    ),
  }
})
jest.mock(`@material-ui/core/Button`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: jest.fn() }
})
jest.mock(`../ProfileLinks`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: ({ t, logoutButton, closeDashboard, ...other }) => (
      <div {...other} closeDashboard={closeDashboard()} className="ProfileLinks">
        <div className="logoutButton">{logoutButton}</div>
        {t({ en: () => `ProfileLinks en`, es: () => `ProfileLinks es` })}
      </div>
    ),
  }
})
jest.mock(`../Layout`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => (
      <div className="Layout">
        <div className="avatar">{props.avatar}</div>
        <div className="text">{props.text}</div>
        <div className="topText">{props.topText}</div>
        <div className="bottomText">{props.bottomText}</div>
      </div>
    ),
  }
})
jest.mock(`../DefaultAvatarSvg`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div className="DefaultAvatarSvg" />,
  }
})
jest.mock(`lib/react/links/Link`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => (
      <a {...props} className={`Link ${props.className}`} onClick={props.onClick()} />
    ),
  }
})
describe(`../index.js`, () => {
  let AccountApplet
  beforeAll(() => {
    AccountApplet = require("../index.js").default
  })
  jestUtils.describeDependencies({
    deps: [
      `@material-ui/core`,
      `lib/react/auth0`,
      `lib/react/useTranslation`,
      `react`,
      `../ProfileLinks`,
      `../Layout`,
      `../DefaultAvatarSvg`,
      `lib/react/links/Link`,
      `prop-types`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  {
    const cases = [[`dark`], [`light`]]
    describe.each(cases)(`<AccountApplet /> (%s mode, user undefined)`, mode => {
      const auth0Login = jest.fn()
      const closeDashboard = jest.fn()
      let html, handleLogin
      beforeAll(() => {
        mockPaletteType(mode)
        useAuth0.mockReturnValueOnce({ login: auth0Login, logout () {} })
        Button.mockImplementationOnce(props => (
          <button {...props} className={`Button ${props.className}`} />
        ))
        html = renderer.create(<AccountApplet closeDashboard={closeDashboard} />)
        try {
          handleLogin = Button.mock.calls[0][0].onClick
        } catch (e) {}
      })
      it(`should render`, () => {
        expect(html.toJSON()).toMatchSnapshot()
      })
      it(`should set up a login button`, () => {
        expect(Button.mock.calls).toHaveLength(1)
        expect(Button.mock.calls[0]).toHaveProperty([0, `onClick`], handleLogin)
        expect(handleLogin).toBeInstanceOf(Function)
        Button.mockClear()
      })
      describe(`login button click`, () => {
        it(`should login and close the dashboard`, () => {
          handleLogin()
          expect(auth0Login.mock.calls).toEqual([[]])
          expect(closeDashboard.mock.calls).toEqual([[]])
        })
      })
    })
  }
  {
    const cases = [
      [`dark`, {}],
      [`light`, {}],
      [`dark`, { profile_id: `1234` }],
      [`light`, { profile_id: `1234` }],
    ]
    describe.each(cases)(`<AccountApplet /> (%s mode, user %j)`, (mode, user) => {
      const closeDashboard = () => {}
      let html
      beforeAll(() => {
        mockPaletteType(mode)
        useAuth0.mockReturnValueOnce({
          user,
          login: () => `auth0.login`,
          logout: () => `auth0.logout`,
        })
        Button.mockImplementationOnce(props => (
          <button {...props} className={`Button ${props.className}`} onClick={props.onClick()} />
        ))
        html = renderer.create(<AccountApplet closeDashboard={() => `closeDashboard`} />)
        Button.mockClear()
      })
      it(`should render`, () => {
        expect(html.toJSON()).toMatchSnapshot()
      })
    })
  }
})