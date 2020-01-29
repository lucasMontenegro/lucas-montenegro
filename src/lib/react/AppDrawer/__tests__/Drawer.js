import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import MuiDrawer from "@material-ui/core/Drawer"
import renderer from "react-test-renderer"
import React from "react"
import Drawer from "../Drawer"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const theme = {
      spacing: n => `theme.spacing(${n})`,
      breakpoints: { up: str => `theme.breakpoints.up('${str}')` },
    }
    const classes = styles(theme)
    return Object.keys(classes).reduce((obj, name) => {
      obj[name] = `${options.name}-${name}(${JSON.stringify(classes[name])})`
      return obj
    }, {})
  },
}))
jest.mock(`lib/react/useTranslation`, () => ({ __esModule: true, default: () => () => `t()` }))
jest.mock(`@material-ui/core/useMediaQuery`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`@material-ui/core/Toolbar`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Toolbar" /> }
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
jest.mock(`../Nav`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="Nav" onClick={props.onClick()} t={props.t()} />,
  }
})
jest.mock(`@material-ui/core/Drawer`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../Drawer`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `@material-ui/core`,
      `react`,
      `prop-types`,
    ])).toMatchSnapshot()
  })
  describe.each([[true], [false]])(`<Drawer /> (is desktop false, is open %j)`, isOpen => {
    it(`should render`, () => {
      useMediaQuery.mockReturnValueOnce(false)
      MuiDrawer.mockImplementationOnce(props => (
        <div {...props} className="MuiDrawer" onClose={props.onClose()} />
      ))
      expect(renderer.create(
        <Drawer
          isOpen={isOpen}
          onClose={() => `props.onClose()`}
        >
          Client
        </Drawer>
      )).toMatchSnapshot()
    })
  })
  describe.each([[true], [false]])(`<Drawer /> (is desktop true, is open %j)`, isOpen => {
    it(`should render`, () => {
      useMediaQuery.mockReturnValueOnce(true)
      MuiDrawer.mockImplementationOnce(props => <div {...props} className="MuiDrawer" />)
      expect(renderer.create(
        <Drawer
          isOpen={isOpen}
          onClose={() => `props.onClose()`}
        >
          Client
        </Drawer>
      )).toMatchSnapshot()
    })
  })
})