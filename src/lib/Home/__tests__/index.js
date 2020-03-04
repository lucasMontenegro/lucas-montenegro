import { makeStyles } from "@material-ui/core/styles"
import { useDarkMode } from "lib/react/DarkMode"
import useContact from "../useContact"
import { useRoute } from "lib/react/routing/context"
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
    palette: { type: paletteType },
  })
  return Object.keys(classes).reduce((classes, key) => {
    classes[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/, `'`)})`
    return classes
  }, classes)
})
jest.mock(`@material-ui/core/Typography`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} component="Typography" /> }
})
jest.mock(`@material-ui/core/Link`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <a {...props} component="Link" /> }
})
jest.mock(`lib/react/useTranslation`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: () => source => (
      <span className="translation">
        {Object.keys(source).map(key => (
          <span key={key} className={key}>{source[key]()}</span>
        ))}
      </span>
    ),
  }
})
jest.mock(`lib/react/DarkMode`, () => ({ __esModule: true, useDarkMode: jest.fn() }))
jest.mock(`../useContact`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`lib/react/MainBar`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} component="MainBar" /> }
})
jest.mock(`@material-ui/core/Container`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} component="Container" /> }
})
jest.mock(`lib/react/DocumentTitle`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: ({ value, ...other }) => <div {...other} component="DocumentTitle">{value}</div>,
  }
})
jest.mock(`../CallToAction`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: ({ onContact, t, ...other }) => (
      <div {...other} onContact={onContact()} component="CallToAction">
        {t({ en: () => `EN`, es: () => `ES` })}
      </div>
    ),
  }
})
jest.mock(`../SvgImage`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} component="SvgImage" /> }
})
jest.mock(`../svg`, () => ({
  __esModule: true,
  default: {
    onlineProfile: `svg.onlineProfile`,
    technologies: `svg.technologies`,
    website: `svg.website`,
  },
}))
jest.mock(`@material-ui/core/Card`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => <div {...props} ref={ref} component="Card" />),
  }
})
jest.mock(`lib/react/WufooForm`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: ({ hash, ...other }) => <div {...other} component="WufooForm">{hash}</div>,
  }
})
jest.mock(`lib/react/routing/context`, () => ({ __esModule: true, useRoute: jest.fn() }))
describe(`../index.js`, () => {
  let Home
  beforeAll(() => {
    Home = require("../index.js").default
  })
  jestUtils.describeDependencies({
    deps: [
      `@material-ui/core`,
      `react`,
      `lib/react/useTranslation`,
      `lib/react/DarkMode`,
      `../useContact`,
      `lib/react/MainBar`,
      `lib/react/DocumentTitle`,
      `../CallToAction`,
      `../SvgImage`,
      `../svg`,
      `lib/react/WufooForm`,
      `lib/react/routing/context`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  describe(`<Home /> (render false)`, () => {
    it(`should render`, () => {
      useRoute.mockReturnValueOnce({ render: {} })
      expect(renderer.create(<Home />).toJSON()).toBeNull()
    })
  })
  {
    const cases = [[`dark`, true], [`light`, false]]
    describe.each(cases)(`<Home /> (render true, %s mode)`, (mode, darkModeValue) => {
      it(`should render`, () => {
        useRoute.mockReturnValueOnce({ render: { home: true } })
        mockPaletteType(mode)
        useDarkMode.mockReturnValueOnce({ value: darkModeValue })
        useContact.mockReturnValueOnce({
          handleClick: () => `contactState.handleClick`,
          ref: React.createRef(),
        })
        expect(renderer.create(<Home />).toJSON()).toMatchSnapshot()
      })
    })
  }
})