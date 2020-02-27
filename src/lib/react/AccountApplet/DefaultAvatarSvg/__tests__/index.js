import renderer from "react-test-renderer"
import React from "react"
import DefaultAvatarSvg from "../index.js"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const classes = styles()
    return Object.keys(classes).reduce((obj, key) => {
      obj[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
      return obj
    }, {})
  },
}))
jest.mock(`../default-avatar.svg`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    ReactComponent: props => <div className={`default-avatar-svg ${props.className}`} />,
  }
})
describe(`../index.js`, () => {
  jestUtils.describeDependencies({
    deps: [
      `@material-ui/core`,
      `react`,
      `../default-avatar.svg`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  describe(`<DefaultAvatarSvg />`, () => {
    it(`should render`, () => {
      expect(renderer.create(<DefaultAvatarSvg />).toJSON()).toMatchSnapshot()
    })
  })
})