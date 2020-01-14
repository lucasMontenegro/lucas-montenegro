import { makeStyles } from "@material-ui/core/styles"
import renderer from "react-test-renderer"
import React from "react"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: jest.fn(() => () => ({
    container: `classes-container`,
    svg: `classes-svg`,
  })),
}))
describe(`../index.js`, () => {
  let SvgImage
  beforeAll(() => {
    SvgImage = require("../SvgImage").default
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  describe(`makeStyles callback`, () => {
    it(`should run`, () => {
      makeStyles.mock.calls[0][0]()
    })
  })
  describe.each([[true], [false]])(`<SvgImage isDark={%j} />`, isDark => {
    it(`should render`, () => {
      const source = {
        light: () => `source.light`,
        dark: () => `source.dark`,
        aspectRatio: `50%`,
      }
      expect(renderer.create(<SvgImage isDark={isDark} source={source} />).toJSON())
        .toMatchSnapshot()
    })
  })
})