import React, { useState } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import useLoginTimeoutAlert from "../useLoginTimeoutAlert"
import renderer from "react-test-renderer"
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
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    ...React,
    __esModule: true,
    default: React,
    useState: jest.fn(),
    useCallback: fn => fn,
  }
})
jest.mock(`@material-ui/core/Snackbar`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(({ onClose, ...other }) => <div {...other} className="Snackbar" />),
  }
})
jest.mock(`@material-ui/lab/Alert`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(({ onClose, ...other }) => <div {...other} className="Alert" />),
  }
})
describe(`../useLoginTimeoutAlert`, () => {
  jestUtils.describeDependencies({
    deps: [
      `lib/react/useTranslation`,
      `react`,
      `@material-ui/core`,
      `@material-ui/lab`,
      `react-test-renderer`,
    ],
    relativeBasePath: __dirname,
  })
  describe(`useLoginTimeoutAlert`, () => {
    const setIsOpen = jest.fn()
    let lta, html, closeLta
    beforeAll(() => {
      useState.mockReturnValueOnce([true, setIsOpen])
      lta = useLoginTimeoutAlert()
      html = renderer.create(lta.node)
      try {
        closeLta = Snackbar.mock.calls[0][0].onClose
      } catch (e) {}
    })
    it(`should expose a snackbar opening function`, () => {
      expect(lta).toHaveProperty(`open`)
      expect(lta.open).toBeInstanceOf(Function)
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
    it(`should set up a Snackbar "onClose" handler`, () => {
      expect(Snackbar.mock.calls).toHaveLength(1)
      expect(Snackbar.mock.calls[0]).toHaveProperty([0, `onClose`], closeLta)
      expect(closeLta).toBeInstanceOf(Function)
    })
    it(`should set up an Alert "onClose" handler`, () => {
      expect(Alert.mock.calls).toHaveLength(1)
      expect(Alert.mock.calls[0]).toHaveProperty([0, `onClose`], closeLta)
      expect(closeLta).toBeInstanceOf(Function)
    })
    describe(`opening function`, () => {
      it(`should set "isOpen" to true`, () => {
        lta.open()
        expect(setIsOpen.mock.calls).toEqual([[true]])
        setIsOpen.mockClear()
      })
    })
    describe(`closing function (reason is "clickaway")`, () => {
      it(`should not call setIsOpen`, () => {
        closeLta({}, `clickaway`)
        expect(setIsOpen.mock.calls).toEqual([])
      })
    })
    describe(`closing function (reason is not "clickaway")`, () => {
      it(`should set "isOpen" to false`, () => {
        closeLta({}, `foo`)
        expect(setIsOpen.mock.calls).toEqual([[false]])
        setIsOpen.mockClear()
      })
    })
  })
})