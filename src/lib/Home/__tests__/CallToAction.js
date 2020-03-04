import { useAuth0 } from "lib/react/auth0"
import renderer from "react-test-renderer"
import React from "react"
import CallToAction from "../CallToAction"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const classes = styles({ spacing: n => 8*n })
    return Object.keys(classes).reduce((output, key) => {
      output[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/, `'`)})`
      return output
    }, {})
  }
}))
jest.mock(`lib/react/auth0`, () => ({ __esModule: true, useAuth0: jest.fn() }))
jest.mock(`@material-ui/core/Toolbar`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} component="Toolbar" /> }
})
jest.mock(`@material-ui/core/Button`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <button {...props} onClick={props.onClick()} component="Button"  />,
  }
})
describe(`../CallToAction`, () => {
  jestUtils.describeDependencies({
    deps: [
      `@material-ui/core`,
      `lib/react/auth0`,
      `react`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  describe.each([[{}], [null]])(`<CallToAction /> (auth0.user %j)`, user => {
    it(`should render`, () => {
      useAuth0.mockReturnValueOnce({ user, login: () => `auth0.login` })
      expect(renderer.create(
        <CallToAction
          t={source => (
            <span className="translation">
              {Object.keys(source).map(languageCode => (
                <span key={languageCode} className={languageCode}>{source[languageCode]()}</span>
              ))}
            </span>
          )}
          onContact={() => `props.onContact`}
        />
      ).toJSON()).toMatchSnapshot()
    })
  })
})