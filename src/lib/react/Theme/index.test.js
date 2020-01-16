import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import { useDarkMode } from "lib/react/DarkMode"
import { createMuiTheme } from "@material-ui/core/styles"
import Theme from "./index.js"
import renderer from "react-test-renderer"
jest.mock(`@material-ui/styles`, () => ({
  __esModule: true,
  ThemeProvider: jest.fn(),
}))
jest.mock(`lib/react/DarkMode`, () => ({
  __esModule: true,
  useDarkMode: jest.fn(),
}))
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  createMuiTheme: x => x,
}))
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `@material-ui/styles`,
      `@material-ui/core`,
    ])).toMatchSnapshot()
  })
  const cases = [
    [true, `dark`],
    [false, `light`],
  ]
  describe.each(cases)(`Theme (dark mode %j)`, (darkModeValue, paletteType) => {
    let theme
    beforeAll(() => {
      ThemeProvider.mockImplementationOnce(props => {
        theme = props.theme
        return null
      })
      useDarkMode.mockReturnValueOnce({ value: darkModeValue })
      renderer.create(<Theme />)
    })
    it(`should expose a theme with the right palette type`, () => {
      expect(theme.palette.type).toBe(paletteType)
    })
  })
})