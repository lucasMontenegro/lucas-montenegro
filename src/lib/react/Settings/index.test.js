import React, { useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import Button from "@material-ui/core/Button"
import renderer from "react-test-renderer"
import Settings from "./index.js"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => {
    const classes = styles({
      spacing: n => 8*n,
      palette: { primary: { main: `theme.palette.primary.main` } },
    })
    return () => Object.keys(classes).reduce((output, key) => {
      output[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
      return output
    }, {})
  }
}))
jest.mock(`lib/react/useTranslation`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: () => source => (
      <div className="translation">
        {Object.keys(source).map(languageCode => (
          <div key={languageCode} className={languageCode}>{source[languageCode]()}</div>
        ))}
      </div>
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
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    ...React,
    __esModule: true,
    default: React,
    useState: jest.fn(),
  }
})
jest.mock(`lib/react/DarkMode`, () => ({
  __esModule: true,
  useDarkMode: () => ({ value: `darkMode.value`, toggle: () => `darkMode.toggle` }),
}))
jest.mock(`@material-ui/core/Dialog`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(props => <div {...props} className="Dialog" />),
  }
})
jest.mock(`@material-ui/core/DialogTitle`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`DialogTitle ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/Avatar`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`Avatar ${props.className}`} />,
  }
})
jest.mock(`lib/react/fontAwesome`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    FontAwesomeIcon: props => <i {...props} className="FontAwesomeIcon" />,
  }
})
jest.mock(`@material-ui/core/Typography`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Typography" /> }
})
jest.mock(`@material-ui/core/Divider`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <hr {...props} className="Divider" /> }
})
jest.mock(`@material-ui/core/DialogContent`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="DialogContent" /> }
})
jest.mock(`@material-ui/core/Switch`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <input {...props} className="Switch" onChange={props.onChange()} />,
  }
})
jest.mock(`lib/react/routing/context`, () => ({
  __esModule: true,
  useRoutingContext: () => ({
    getTranslationLinks: () => [
      { languageCode: `es`, location: { pathname: `/es/foo` }, text: `Spanish` },
      { languageCode: `pt`, location: { pathname: `/pt/foo` }, text: `Portuguese` },
    ],
  }),
}))
jest.mock(`lib/react/links/Link`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <a {...props} className="Link" /> }
})
jest.mock(`@material-ui/core/DialogActions`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="DialogActions" /> }
})
jest.mock(`@material-ui/core/Button`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(props => <button {...props} className="Button" />),
  }
})
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`, `@material-ui/core`])).toMatchSnapshot()
  })
  describe.each([[true], [false]])(`<Settings /> (is open %j)`, isOpenValue => {
    let html
    const setValue = jest.fn()
    const children = jest.fn(open => (
      <button className="settings-children" onClick={open}>Open Settings</button>
    ))
    let open, close
    beforeAll(() => {
      useState.mockReturnValueOnce([isOpenValue, setValue])
      html = renderer.create(<Settings>{children}</Settings>)
      try {
        open = children.mock.calls[0][0]
      } catch (e) {}
      try {
        close = Dialog.mock.calls[0][0].onClose
      } catch (e) {}
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
    it(`should pass a dialog opening function to the children render prop`, () => {
      expect(children.mock.calls).toHaveLength(1)
      expect(children.mock.calls[0]).toHaveLength(1)
      expect(children.mock.calls[0][0]).toBe(open)
      expect(open).toBeInstanceOf(Function)
      children.mockClear()
    })
    describe(`dialog opening function`, () => {
      it(`should set the state to true`, () => {
        open()
        expect(setValue.mock.calls).toEqual([[true]])
        setValue.mockClear()
      })
    })
    it(`should pass a dialog closing function to the Dialog component`, () => {
      expect(Dialog.mock.calls).toHaveLength(1)
      expect(Dialog.mock.calls).toHaveProperty([0, 0, `onClose`])
      expect(Dialog.mock.calls[0][0].onClose).toBe(close)
      expect(close).toBeInstanceOf(Function)
      Dialog.mockClear()
    })
    it(`should pass a dialog closing function to the Button component`, () => {
      expect(Button.mock.calls).toHaveLength(1)
      expect(Button.mock.calls).toHaveProperty([0, 0, `onClick`])
      expect(Button.mock.calls[0][0].onClick).toBe(close)
      expect(close).toBeInstanceOf(Function)
      Button.mockClear()
    })
    describe(`dialog closing function`, () => {
      it(`should set the state to false`, () => {
        close()
        expect(setValue.mock.calls).toEqual([[false]])
        setValue.mockClear()
      })
    })
  })
})