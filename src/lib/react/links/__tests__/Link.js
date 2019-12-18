import MuiLink from "@material-ui/core/Link"
import React from "react"
import renderer from "react-test-renderer"
import Link from "../Link"
jest.mock(`react-router-dom`, () => ({
  __esModule: true,
  Link: () => null,
}))
jest.mock(`@material-ui/core/Link`, () => ({
  __esModule: true,
  default: jest.fn(),
}))
MuiLink.mockImplementation(props => {
  const Cmp = props.component
  return <Cmp />
})
describe(`../Link`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `react-router-dom`,
      `@material-ui/core`,
    ])).toMatchSnapshot()
  })
  it(`should run`, () => {
    renderer.create(<Link />)
  })
})