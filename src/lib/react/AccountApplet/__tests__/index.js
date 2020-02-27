import { makeStyles } from "@material-ui/core/styles"
import { useAuth0 } from "lib/react/auth0"
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
  return {
    __esModule: true,
    default: props => (
      <button {...props} className={`Button ${props.className}`} onClick={props.onClick()} />
    ),
  }
})
jest.mock(`../ProfileLinks`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: ({ t, logoutButton, ...other }) => (
      <div {...other} className="ProfileLinks">
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
    default: props => <a {...props} className={`Link ${props.className}`} />,
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
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  {
    const cases = [
      [`dark`, undefined],
      [`light`, undefined],
      [`dark`, {}],
      [`light`, {}],
      [`dark`, { profile_id: `1234` }],
      [`light`, { profile_id: `1234` }],
    ]
    describe.each(cases)(`<AccountApplet /> (%s mode, user %j)`, (mode, user) => {
      let html
      beforeAll(() => {
        mockPaletteType(mode)
        useAuth0.mockReturnValueOnce({
          user,
          login: () => `auth0.login`,
          logout: () => `auth0.logout`,
        })
        html = renderer.create(<AccountApplet />)
      })
      it(`should render`, () => {
        expect(html.toJSON()).toMatchSnapshot()
      })
    })
  }
})