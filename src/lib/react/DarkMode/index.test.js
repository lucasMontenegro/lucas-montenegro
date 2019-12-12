import renderer from "react-test-renderer"
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: {
    window: {
      localStorage: { setItem: jest.fn() },
    },
    setTimeout: jest.fn(),
  },
}))
jest.mock(`react`, () => {
  const react = jest.requireActual(`react`)
  return {
    ...react,
    __esModule: true,
    default: react,
    createContext: jest.fn(() => ({
      Provider: () => null,
    })),
    useContext: () => {},
    useState: jest.fn(),
    useMemo: jest.fn(),
  }
})
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  const cases = [
    [`dark`, true],
    [`light`, false],
    [null, false],
    [undefined, false],
  ]
  describe.each(cases)(`index.js (stored value === %j)`, (storedValue, initialValue) => {
    let globals
    let React, createContext, useContext, useState, useMemo
    let useDarkMode, DarkMode
    beforeAll(() => {
      globals = require("lib/utils/globals").default
      globals.window.localStorage.getItem = () => storedValue
      ;({
        default: React,
        createContext,
        useContext,
        useState,
        useMemo,
      } = require("react"))
      ;({
        useDarkMode,
        default: DarkMode,
      } = require("./index.js"))
    })
    afterAll(() => jest.resetModules())
    it(`should detect the initial value`, () => {
      expect(createContext.mock.calls[0][0].value).toBe(initialValue)
      createContext.mockClear()
    })
    describe(`useDarkMode`, () => {
      it(`should run`, () => {
        useDarkMode()
      })
    })
    {
      const cases = [
        [true, `dark`, `light`, false],
        [false, `light`, `dark`, true],
      ]
      const msg = `DarkMode (state value %j)`
      describe.each(cases)(msg, (stateValue, string, newString, newStateValue) => {
        const saveValue = jest.fn()
        let darkMode
        beforeAll(() => {
          useState.mockReturnValueOnce([stateValue, saveValue])
          renderer.create(<DarkMode />)
          darkMode = useMemo.mock.calls[0][0]()
          useMemo.mockClear()
        })
        it(`should expose a string indicating the mode`, () => {
          expect(darkMode.string).toBe(string)
        })
        describe(`darkMode.toggle`, () => {
          beforeAll(() => {
            darkMode.toggle()
            globals.setTimeout.mock.calls[0][0]()
            globals.setTimeout.mockClear()
          })
          it(`should save the new mode in the local storage`, () => {
            expect(globals.window.localStorage.setItem.mock.calls[0][1]).toBe(newString)
            globals.window.localStorage.setItem.mockClear()
          })
          it(`should update the state`, () => {
            expect(saveValue.mock.calls[0][0]).toBe(newStateValue)
          })
        })
      })
    }
  })
})