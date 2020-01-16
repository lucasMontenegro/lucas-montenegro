import renderer from "react-test-renderer"
import React from "react"
import svg from "../svg"
describe(`../svg`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react-scripts`])).toMatchSnapshot()
  })
  const cases = [
    [`onlineProfile`, `light`],
    [`onlineProfile`, `dark`],
    [`technologies`, `light`],
    [`technologies`, `dark`],
    [`website`, `light`],
    [`website`, `dark`],
  ]
  describe.each(cases)(`svg.%s.%s`, (name, mode) => {
    it(`should render`, () => {
      const Svg = svg[name][mode]
      expect(renderer.create(<Svg className="foo" />)).toMatchSnapshot()
    })
  })
})