import renderer from "react-test-renderer"
import React from "react"
import { ReactComponent } from "../dark.svg"
describe(`../dark.svg`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react-scripts`])).toMatchSnapshot()
  })
  describe(`ReactComponent`, () => {
    it(`should run`, () => {
      renderer.create(<ReactComponent />)
    })
  })
})