import renderer from "react-test-renderer"
import React from "react"
import Div from "../Div"
describe(`../Div`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`, `prop-types`])).toMatchSnapshot()
  })
  {
    const cases = [
      [{ color: `blue` }],
      [{}],
    ]
    describe.each(cases)(`Div (%j)`, props => {
      it(`should render`, () => {
        expect(renderer.create(
          <Div
            {...props}
            box={256}
            style={{ borderRadius: 8 }}
            ref={() => {}}
          >
            lorem ipsum
          </Div>
        ).toJSON()).toMatchSnapshot()
      })
    })
  }
})