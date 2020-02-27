import renderer from "react-test-renderer"
import React from "react"
import Layout from "../Layout"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const classes = styles({ spacing: n => 8*n })
    return Object.keys(classes).reduce((obj, key) => {
      obj[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
      return obj
    }, {})
  },
}))
jest.mock(`@material-ui/core/Typography`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`Typography ${props.className}`} />,
  }
})
describe(`../Layout`, () => {
  jestUtils.describeDependencies({
    deps: [
      `@material-ui/core`,
      `react`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  describe.each([[`props.text`], [undefined]])(`<Layout /> (text %j)`, text => {
    it(`should render`, () => {
      expect(renderer.create(
        <Layout
          avatar="props.avatar"
          text={text}
          topText="props.topText"
          bottomText="props.bottomText"
        />
      )).toMatchSnapshot()
    })
  })
})