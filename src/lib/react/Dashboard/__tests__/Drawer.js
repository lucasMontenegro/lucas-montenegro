import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import MuiDrawer from "@material-ui/core/Drawer"
import renderer from "react-test-renderer"
import React from "react"
jest.mock(`@material-ui/core/styles`, () => ({ __esModule: true, makeStyles: jest.fn() }))
let paletteType
makeStyles.mockImplementation((styles, options) => () => {
  const theme = {
    breakpoints: { up: str => `theme.breakpoints.up(\`${str}\`)` },
    palette: {
      text: { primary: `theme.palette.text.primary` },
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
function mockPaletteType (mode) {
  paletteType = mode
}
jest.mock(`lib/react/useTranslation`, () => ({
  __esModule: true,
  default: () => () => `() => useTranslation()()`,
}))
jest.mock(`@material-ui/core/useMediaQuery`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`@material-ui/core/AppBar`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <header {...props} className={`AppBar ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/Toolbar`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`Toolbar ${props.className}`} />,
  }
})
jest.mock(`../CloseButton`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => (
      <div {...props} className="CloseButton" onClick={props.onClick()} t={props.t()} />
    ),
  }
})
jest.mock(`lib/react/Settings`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => (
      <React.Fragment>
        <div {...props} className="Settings" children={null} />
        {props.children(() => `function openSettingsDialog () {}`)}
      </React.Fragment>
    ),
  }
})
jest.mock(`../SettingsButton`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => (
      <button {...props} className="SettingsButton" onClick={props.onClick()} t={props.t()} />
    ),
  }
})
jest.mock(`lib/react/AccountApplet`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div className="AccountApplet" /> }
})
jest.mock(`@material-ui/core/Divider`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div className="Divider" /> }
})
jest.mock(`../Nav`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="Nav" onClick={props.onClick()} t={props.t()} />,
  }
})
jest.mock(`@material-ui/core/Drawer`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../Drawer`, () => {
  let Drawer
  beforeAll(() => {
    Drawer = require("../Drawer").default
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  {
    const cases = [
      [true, `dark`],
      [false, `dark`],
      [true, `light`],
      [false, `light`],
    ]
    describe.each(cases)(`<Drawer /> (is desktop false, is open %j, %s mode)`, (isOpen, mode) => {
      it(`should render`, () => {
        mockPaletteType(mode)
        useMediaQuery.mockReturnValueOnce(false)
        MuiDrawer.mockImplementationOnce(props => (
          <div {...props} className="MuiDrawer" onClose={props.onClose()} />
        ))
        expect(renderer.create(
          <Drawer isOpen={isOpen} onClose={() => `props.onClose`}>Client</Drawer>
        )).toMatchSnapshot()
      })
    })
  }
  {
    const cases = [
      [true, `dark`],
      [false, `dark`],
      [true, `light`],
      [false, `light`],
    ]
    describe.each(cases)(`<Drawer /> (is desktop true, is open %j, %s mode)`, (isOpen, mode) => {
      it(`should render`, () => {
        mockPaletteType(mode)
        useMediaQuery.mockReturnValueOnce(true)
        MuiDrawer.mockImplementationOnce(props => <div {...props} className="MuiDrawer" />)
        expect(renderer.create(
          <Drawer isOpen={isOpen} onClose={() => `props.onClose`}>Client</Drawer>
        )).toMatchSnapshot()
      })
    })
  }
})