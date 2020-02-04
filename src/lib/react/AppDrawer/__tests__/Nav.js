import { makeStyles } from "@material-ui/core/styles"
import Link from "lib/react/links/Link"
import renderer from "react-test-renderer"
import React from "react"
jest.mock(`@material-ui/core/styles`, () => ({ __esModule: true, makeStyles: jest.fn() }))
let paletteType
makeStyles.mockImplementationOnce((styles, options) => () => {
  const theme = {
    palette: {
      primary: { main: `theme.palette.primary.main` },
      type: paletteType,
    },
    spacing: n => 8*n,
  }
  const classes = styles(theme)
  return Object.keys(classes).reduce((obj, name) => {
    obj[name] = `${options.name}-${name}(${JSON.stringify(classes[name]).replace(/"/gm, `'`)})`
    return obj
  }, {})
})
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
          location: { pathname: `/foo` },
          render: {
            Icon: props => (
              <span>
                {props.t({
                  en: () => `en Foo Icon`,
                  es: () => `es Foo Icon`,
                })}
              </span>
            ),
            text: {
              en: () => `English Foo`,
              es: () => `Spanish Foo`,
            },
          },
        },
        {
          clientName: `bar`,
          active: true,
          location: { pathname: `/bar` },
          render: {
            Icon: () => <span>Bar Icon</span>,
            Icon: props => (
              <span>
                {props.t({
                  en: () => `en Bar Icon`,
                  es: () => `es Bar Icon`,
                })}
              </span>
            ),
            text: {
              en: () => `English Bar`,
              es: () => `Spanish Bar`,
            },
          },
        },
        {
          clientName: `baz`,
          active: false,
          location: { pathname: `/baz` },
          render: {
            Icon: props => (
              <span>
                {props.t({
                  en: () => `en Baz Icon`,
                  es: () => `es Baz Icon`,
                })}
              </span>
            ),
            text: {
              en: () => `English Baz`,
              es: () => `Spanish Baz`,
            },
          },
        },
      ],
    }),
  }
})
jest.mock(`@material-ui/core/ListItem`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <li {...props} className={`ListItem ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/ListItemIcon`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`ListItemIcon ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/ListItemText`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`ListItemText ${props.className}`} />,
  }
})
jest.mock(`lib/react/links/Link`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(props => <a {...props} className="Link" onClick={props.onClick()} />),
  }
})
describe(`../Nav`, () => {
  let Nav
  beforeAll(() => {
    Nav = require("../Nav").default
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `@material-ui/core`,
      `prop-types`,
    ])).toMatchSnapshot()
  })
  describe.each([[`light`], [`dark`]])(`<Nav /> (%s mode)`, mode => {
    it(`should render`, () => {
      paletteType = mode
      function t (source) {
        return JSON.stringify(Object.keys(source).reduce((translation, languageCode) => {
          translation[languageCode] = source[languageCode]()
          return translation
        }, {})).replace(/"/gm, `'`)
      }
      expect(
        renderer.create(<Nav t={t} onClick={() => `props.onClick()`} />).toJSON()
      ).toMatchSnapshot()
    })
  })
})