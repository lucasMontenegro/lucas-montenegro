import useAccessButtonState from "../useAccessButtonState"
import renderer from "react-test-renderer"
import React from "react"
import AccessButton from "../index.js"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const classes = styles({ spacing: n => 8*n })
    return Object.keys(classes).reduce((obj, key) => {
      obj[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
      return obj
    }, {})
  }
}))
jest.mock(`../useAccessButtonState`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`lib/react/useTranslation`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: () => source => (
      <span className="translation">
        {Object.keys(source).map(languageCode => (
          <span key={languageCode} className={languageCode}>{source[languageCode]()}</span>
        ))}
      </span>
    ),
  }
})
jest.mock(`lib/react/useResponsiveLayout`, () => ({
  __esModule: true,
  default: () => source => Object.keys(source).reduce((output, device) => {
    output[device] = source[device]()
    return output
  }, {}),
}))
jest.mock(`@material-ui/core/Button`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <button {...props} className="Button" />,
  }
})
jest.mock(`@material-ui/core/Dialog`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="Dialog" />,
  }
})
jest.mock(`@material-ui/core/DialogContent`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="DialogContent" />,
  }
})
jest.mock(`@material-ui/core/DialogContentText`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="DialogContentText" />,
  }
})
jest.mock(`@material-ui/core/DialogActions`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="DialogActions" />,
  }
})
jest.mock(`@material-ui/core/FormControlLabel`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: ({ className, label, control, ...other }) => (
      <label {...other} className={`FormControlLabel ${className}`}>
        <div className="label-prop">{label}</div>
        <div className="control-prop">{control}</div>
      </label>
    ),
  }
})
jest.mock(`@material-ui/core/Typography`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: ({ component: Cmp, ...other }) => <Cmp {...other} className="Typography" />,
  }
})
jest.mock(`@material-ui/core/Checkbox`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <input {...props} type="checkbox" className="Checkbox" />,
  }
})
describe(`../index.js`, () => {
  jestUtils.describeDependencies({
    deps: [
      `@material-ui/core`,
      `../useAccessButtonState`,
      `lib/react/useTranslation`,
      `lib/react/useResponsiveLayout`,
      `react`,
      `prop-types`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  describe.each([[true], [false]])(`<AccessButton /> (state.loggedIn %j)`, loggedIn => {
    it(`should render`, () => {
      useAccessButtonState.mockReturnValueOnce({
        loggedIn,
        logout: {
          open: `state.logout.open`,
          isOpen: `state.logout.isOpen`,
          close: `state.logout.close`,
          auto: `state.logout.auto`,
          handleAuto: `state.logout.handleAuto`,
          confirm: `state.logout.confirm`,
        },
        login: `state.login`,
      })
      expect(renderer.create(<AccessButton closeDashboard={() => {}} />)).toMatchSnapshot()
    })
  })
})