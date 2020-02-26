import React, { useContext, useState } from "react"
import initAuth0 from "../initAuth0"
import { Auth0Context, useAuth0, Auth0Provider } from "../index.js"
import renderer from "react-test-renderer"
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    ...React,
    __esModule: true,
    default: React,
    createContext: () => ({
      Provider: function Auth0ContextProvider (props) {
        return <div {...props} className="Auth0ContextProvider" />
      },
    }),
    useContext: jest.fn(),
    useState: jest.fn(),
    useEffect: fn => fn(),
    useMemo: fn => fn(),
  }
})
jest.mock(`../initAuth0`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`../makeLoginFunction`, () => ({
  __esModule: true,
  default: () => function login () {},
}))
jest.mock(`../makeLogoutFunction`, () => ({
  __esModule: true,
  default: () => function logout () {},
}))
describe(`../index.js`, () => {
  jestUtils.describeDependencies({
    deps: [
      `react`,
      `../initAuth0`,
      `../makeLoginFunction`,
      `../makeLogoutFunction`,
      `prop-types`,
    ],
    relativeBasePath: __dirname,
  })
  describe(`Auth0Context`, () => {
    it(`should be configured properly`, () => {
      expect(Auth0Context).toMatchSnapshot()
    })
  })
  describe(`useAuth0`, () => {
    it(`should run`, () => {
      const contextValue = {}
      useContext.mockReturnValueOnce(contextValue)
      expect(useAuth0()).toBe(contextValue)
      useContext.mockClear()
    })
  })
  describe.each([[{}], [null]])(`Auth0Provider (client %j)`, client => {
    let html
    beforeAll(() => {
      useState.mockReturnValueOnce([client, () => {}])
      useState.mockReturnValueOnce([{}, () => {}])
      html = renderer.create(
        <Auth0Provider onLoginPopupTimeout={() => {}} getLogoutUrl={() => {}}>
          children
        </Auth0Provider>
      )
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
    it(`should initialize Auth0`, () => {
      expect(initAuth0.mock.calls).toHaveLength(1)
      initAuth0.mockClear()
    })
  })
})