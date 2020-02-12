import React, { createContext, useState } from "react"
import Drawer from "../Drawer"
import renderer from "react-test-renderer"
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    ...React,
    __esModule: true,
    default: React,
    createContext: jest.fn(),
    useContext: x => x,
    useState: jest.fn(),
    useCallback: x => x,
  }
})
const DashboardProvider = jest.fn(props => (
  <div {...props} className="DashboardContext.Provider" />
))
createContext.mockReturnValueOnce({ Provider: DashboardProvider })
jest.mock(`../Drawer`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: jest.fn(props => <div {...props} className="Drawer" />) }
})
describe(`../index.js`, () => {
  let DashboardContext, useDashboardOpener, Dashboard
  beforeAll(() => {
    ({ DashboardContext, useDashboardOpener, default: Dashboard } = require("../index.js"))
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`, `prop-types`])).toMatchSnapshot()
  })
  describe(`DashboardContext`, () => {
    it(`should have a default value that runs`, () => {
      expect(createContext.mock.calls).toHaveLength(1)
      expect(createContext.mock.calls[0]).toHaveLength(1)
      const openDashboard = createContext.mock.calls[0][0]
      expect(openDashboard).toBeInstanceOf(Function)
      openDashboard()
    })
  })
  describe(`useDashboardOpener`, () => {
    it(`should run`, () => {
      useDashboardOpener()
    })
  })
  describe.each([[true], [false]])(`<Dashboard /> (is open %j)`, isOpen => {
    const setIsOpen = jest.fn()
    let html
    beforeAll(() => {
      useState.mockReturnValueOnce([isOpen, setIsOpen])
      html = renderer.create(<Dashboard>Client</Dashboard>)
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
    describe(`"onClose" drawer event handler`, () => {
      it(`should close the drawer`, () => {
        expect(Drawer.mock.calls).toHaveLength(1)
        const fn = Drawer.mock.calls[0][0].onClose
        expect(fn).toBeInstanceOf(Function)
        fn()
        Drawer.mockClear()
        expect(setIsOpen.mock.calls).toEqual([[false]])
        setIsOpen.mockClear()
      })
    })
    describe(`context value`, () => {
      it(`should open the drawer`, () => {
        expect(DashboardProvider.mock.calls).toHaveLength(1)
        const fn = DashboardProvider.mock.calls[0][0].value
        expect(fn).toBeInstanceOf(Function)
        fn()
        DashboardProvider.mockClear()
        expect(setIsOpen.mock.calls).toEqual([[true]])
        setIsOpen.mockClear()
      })
    })
  })
})