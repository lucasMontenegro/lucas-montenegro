import { makeStyles } from "@material-ui/core/styles"
import renderer from "react-test-renderer"
import React from "react"
jest.mock(`@material-ui/core/styles`, () => ({ __esModule: true, makeStyles: jest.fn() }))
let paletteType
makeStyles.mockImplementation((styles, options) => () => {
  const classes = styles({
    palette: {
      primary: { main: `theme.palette.primary.main` },
      type: paletteType,
    },
    spacing: n => 8*n,
  })
  return Object.keys(classes).reduce((obj, key) => {
    obj[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
    return obj
  }, {})
})
function mockPaletteType (mode) {
  paletteType = mode
}
jest.mock(`@material-ui/core/List`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <ul {...props} className="List" /> }
})
jest.mock(`lib/react/routing/context`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    useRoutingContext: () => ({
      clientLinks: [
        {
          clientName: `foo`,
          active: false,
          render: {
            text: {
              en: () => `EN Foo`,
              es: () => `ES Foo`,
            },
            Icon: props => props.t({
              en: () => <i>EN Foo Icon</i>,
              es: () => <i>ES Foo Icon</i>,
            }),
          },
          location: { pathname: `/foo` },
        },
        {
          clientName: `bar`,
          active: true,
          render: {
            text: {
              en: () => `EN Bar`,
              es: () => `ES Bar`,
            },
            Icon: props => props.t({
              en: () => <i>EN Bar Icon</i>,
              es: () => <i>ES Bar Icon</i>,
            }),
          },
          location: { pathname: `/bar` },
        },
        {
          clientName: `baz`,
          active: false,
          render: {
            text: {
              en: () => `EN Baz`,
              es: () => `ES Baz`,
            },
            Icon: props => props.t({
              en: () => <i>EN Baz Icon</i>,
              es: () => <i>ES Baz Icon</i>,
            }),
          },
          location: { pathname: `/baz` },
        },
      ],
    }),
  }
})
jest.mock(`@material-ui/core/Tooltip`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Tooltip" /> }
})
jest.mock(`lib/react/links/Link`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <a {...props} className={`Link ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/ListItem`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`ListItem ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/ListItemIcon`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`ListItemIcon ${props.className}`} />,
  }
})
describe(`../TabletNav`, () => {
  let TabletNav
  beforeAll(() => {
    TabletNav = require("../TabletNav").default
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  describe.each([[`light`], [`dark`]])(`<TabletNav /> (%s mode)`, mode => {
    it(`should render`, () => {
      mockPaletteType(mode)
      function t (source) {
        return (
          <div className="translation">
            {Object.keys(source).map(languageCode => (
              <div key={languageCode} className={languageCode}>{source[languageCode]()}</div>
            ))}
          </div>
        )
      }
      expect(renderer.create(<TabletNav t={t} />).toJSON()).toMatchSnapshot()
    })
  })
})