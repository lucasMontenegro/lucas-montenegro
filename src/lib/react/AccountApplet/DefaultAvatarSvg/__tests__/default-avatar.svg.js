import renderer from "react-test-renderer"
import React from "react"
import { ReactComponent } from "../default-avatar.svg"
describe(`../default-avatar.svg`, () => {
  jestUtils.describeDependencies({
    deps: [
      `react`,
      `react-scripts`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  describe(`<ReactComponent />`, () => {
    it(`should render`, () => {
      expect(renderer.create(<ReactComponent />).toJSON()).toMatchSnapshot()
    })
  })
})