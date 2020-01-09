import renderer from "react-test-renderer"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: jest.fn(() => () => ({
    container: `classes-container`,
    svg: `classes-svg`,
  })),
}))
jest.mock(`../dark.svg`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, ReactComponent: props => <div {...props} className="dark-svg" /> }
})
jest.mock(`../light.svg`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, ReactComponent: props => <div {...props} className="light-svg" /> }
})
describe(`../index.js`, () => {
  let TechnologiesSvg
  beforeAll(() => {
    TechnologiesSvg = require("../index.js").default
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  describe(`makeStyles callback`, () => {
    it(`should run`, () => {
      makeStyles.mock.calls[0][0]()
    })
  })
  describe.each([[true], [false]])(`<TechnologiesSvg isDark={%j} />`, isDark => {
    it(`should render`, () => {
      expect(renderer.create(<TechnologiesSvg isDark={isDark} />).toJSON()).toMatchSnapshot()
    })
  })
})