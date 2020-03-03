import { useDarkMode } from "lib/react/DarkMode"
import renderer from "react-test-renderer"
import React from "react"
import Theme from "./index.js"
jest.mock(`@material-ui/styles`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    ThemeProvider (props) {
      return <div {...props} component="ThemeProvider" />
    },
  }
})
jest.mock(`lib/react/DarkMode`, () => ({ __esModule: true, useDarkMode: jest.fn() }))
jest.mock(`@material-ui/core/styles`, () => ({ __esModule: true, createMuiTheme: x => x }))
describe(`./index.js`, () => {
  jestUtils.describeDependencies({
    deps: [
      `react`,
      `@material-ui/styles`,
      `lib/react/DarkMode`,
      `@material-ui/core`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  describe.each([[true], [false]])(`Theme (dark mode %j)`, darkModeValue => {
    it(`should render`, () => {
      useDarkMode.mockReturnValueOnce({ value: darkModeValue })
      expect(renderer.create(<Theme>children</Theme>).toJSON()).toMatchSnapshot()
    })
  })
})