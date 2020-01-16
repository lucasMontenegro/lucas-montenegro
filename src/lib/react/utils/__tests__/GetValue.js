import renderer from "react-test-renderer"
import React from "react"
import Button from "@material-ui/core/Button"
import GetValue from "../GetValue"
jest.mock(`@material-ui/core/Button`, () => ({
  __esModule: true,
  default: jest.fn(),
}))
Button.mockImplementation(props => (<button {...props} />))
describe(`../GetValue`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `@material-ui/core`,
      `prop-types`,
    ])).toMatchSnapshot()
  })
  {
    const id = `id`
    const className = `className`
    const cases = [
      [{ id, className, }],
      [{     className, }],
      [{ id,            }],
      [{                }],
    ]
    describe.each(cases)(`GetValue (%j)`, props => {
      it(`should render`, () => {
        expect(renderer.create(
          <GetValue
            {...props}
            value={{ bar: 8 }}
            onClick={() => {}}
          />
        ).toJSON()).toMatchSnapshot()
      })
    })
  }
})