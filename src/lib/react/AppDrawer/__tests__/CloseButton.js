import IconButton from "@material-ui/core/IconButton"
import renderer from "react-test-renderer"
import React from "react"
import CloseButton from "../CloseButton"
jest.mock(`@material-ui/core/Tooltip`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Tooltip" /> }
})
jest.mock(`@material-ui/core/IconButton`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(props => (
      <button {...props} className="IconButton" onClick={props.onClick()} />
    )),
  }
})
jest.mock(`@material-ui/icons/Close`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <span {...props}>CloseIcon</span> }
})
describe(`../CloseButton`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `@material-ui/core`,
      `@material-ui/icons`,
      `prop-types`,
    ])).toMatchSnapshot()
  })
  describe(`<CloseButton /> (is desktop true)`, () => {
    it(`should render`, () => {
      expect(renderer.create(
        <CloseButton isDesktop={true} t={() => {}} onClick={() => {}} />
      ).toJSON()).toBeNull()
    })
  })
  describe(`<CloseButton /> (is desktop false)`, () => {
    it(`should render`, () => {
      function t (source) {
        return Object.keys(source).reduce((translations, languageCode) => {
          translations[languageCode] = source[languageCode]()
          return translations
        }, {})
      }
      expect(renderer.create(
        <CloseButton isDesktop={false} t={t} onClick={() => `props.onClick()`} />
      ).toJSON()).toMatchSnapshot()
    })
  })
})