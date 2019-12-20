import renderer from "react-test-renderer"
import React from "react"
import Div from "../Div"
describe(`../Div`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`, `prop-types`])).toMatchSnapshot()
  })
  {
    const box = 256
    const color = `blue`
    const style = { borderRadius: 8 }
    const children = `lorem ipsum`
    const ref = () => {}
    const cases = [
      [{ box, color, style, children, ref, }],
      [{      color, style, children, ref, }],
      [{ box,        style, children, ref, }],
      [{             style, children, ref, }],
      [{ box, color,        children, ref, }],
      [{      color,        children, ref, }],
      [{ box,               children, ref, }],
      [{                    children, ref, }],
      [{ box, color, style,           ref, }],
      [{      color, style,           ref, }],
      [{ box,        style,           ref, }],
      [{             style,           ref, }],
      [{ box, color,                  ref, }],
      [{      color,                  ref, }],
      [{ box,                         ref, }],
      [{                              ref, }],
      [{ box, color, style, children,      }],
      [{      color, style, children,      }],
      [{ box,        style, children,      }],
      [{             style, children,      }],
      [{ box, color,        children,      }],
      [{      color,        children,      }],
      [{ box,               children,      }],
      [{                    children,      }],
      [{ box, color, style,                }],
      [{      color, style,                }],
      [{ box,        style,                }],
      [{             style,                }],
      [{ box, color,                       }],
      [{      color,                       }],
      [{ box,                              }],
      [{                                   }],
    ]
    describe.each(cases)(`Div (%j)`, props => {
      it(`should render`, () => {
        expect(renderer.create(<Div {...props} />).toJSON()).toMatchSnapshot()
      })
    })
  }
})