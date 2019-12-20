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
  {
    const id = `id`
    const className = `className`
    const source = { foo: `123` }
    const cases = [
      [{ id, className, source, }],
      [{     className, source, }],
      [{ id,            source, }],
      [{                source, }],
      [{ id, className,         }],
      [{     className,         }],
      [{ id,                    }],
      [{                        }],
    ]
    describe.each(cases)(`StringifyObject (%j)`, props => {
      it(`should render`, () => {
        expect(renderer.create(<StringifyObject {...props} />).toJSON()).toMatchSnapshot()
      })
    })
  }
})