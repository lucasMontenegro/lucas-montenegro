import renderer from "react-test-renderer"
import React from "react"
import SettingsButton from "../SettingsButton"
jest.mock(`@material-ui/core/Tooltip`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Tooltip" /> }
})
jest.mock(`@material-ui/core/IconButton`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <button {...props} className="IconButton" onClick={props.onClick()} />,
  }
})
jest.mock(`lib/react/fontAwesome`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    FontAwesomeIcon: props => <i {...props} className="FontAwesomeIcon" />,
  }
})
describe(`../SettingsButton`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`, `@material-ui/core`])).toMatchSnapshot()
  })
  describe(`<SettingsButton />`, () => {
    it(`should render`, () => {
      function t (source) {
        return Object.keys(source).reduce((translations, languageCode) => {
          translations[languageCode] = source[languageCode]()
          return translations
        }, {})
      }
      expect(renderer.create(
        <SettingsButton t={t} onClick={() => `props.onClick`} />
      ).toJSON()).toMatchSnapshot()
    })
  })
})