import React from "react"
import MainBar from "../index.js"
import renderer from "react-test-renderer"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const classes = styles({
      spacing: n => 8*n,
      breakpoints: { up: str => `theme.breakpoints.up('${str}')` },
    })
    return Object.keys(classes).reduce((obj, key) => {
      obj[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
      return obj
    }, {})
  },
}))
jest.mock(`lib/react/useResponsiveLayout`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: () => source => (
      <div className="responsive-layout">
        {Object.keys(source).map(key => <div key={key} className={key}>{source[key]()}</div>)}
      </div>
    ),
  }
})
jest.mock(`../TabletDrawer`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: () => <div>TabletDrawer</div> }
})
jest.mock(`../MobileBar`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: () => <div>MobileBar</div> }
})
describe(`../index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `@material-ui/core`,
      `react`,
      `prop-types`,
    ])).toMatchSnapshot()
  })
  describe.each([[true], [false]])(`<MainBar /> (hide mobile bar %j)`, hideMobile => {
    it(`should render`, () => {
      const node = <MainBar hideMobile={hideMobile}>children</MainBar>
      expect(renderer.create(node).toJSON()).toMatchSnapshot()
    })
  })
})