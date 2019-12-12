import renderer from "react-test-renderer"
import React from "react"
import Logo from "./index.js"
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react-scripts`])).toMatchSnapshot()
  })
  describe(`Logo`, () => {
    it(`should run`, () => {
      renderer.create(<Logo />)
    })
  })
})