import renderer from "react-test-renderer"
import React from "react"
import StringifyObject from "../StringifyObject"
describe(`../StringifyObject`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `stringify-object`,
      `prop-types`,
    ])).toMatchSnapshot()
  })
  describe(`StringifyObject`, () => {
    it(`should render`, () => {
      expect(renderer.create(
        <StringifyObject
          id="id"
          className="className"
          source={{ foo: `123` }}
        />
      ).toJSON()).toMatchSnapshot()
    })
  })
})