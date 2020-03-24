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
      Provider: jest.fn(function Auth0ContextProvider (props) {
        return <div {...props} className="Auth0ContextProvider" />
      }),
    }),
    useContext: jest.fn(),
    useState: jest.fn(),
    useEffect: fn => fn(),
    useMemo: fn => fn(),
  }
})
jest.mock(`../initAuth0`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`../useLoginTimeoutAlert`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: () => ({
      open () {},
      node: <div className="LoginTimeoutAlert" />,
    }),
  }
})
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
      `../useLoginTimeoutAlert`,
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
  describe(`Auth0Provider (client is defined)`, () => {
    const client = { getTokenSilently: jest.fn() }
    let html, value
    beforeAll(() => {
      useState.mockReturnValueOnce([client, () => {}])
      useState.mockReturnValueOnce([{}, () => {}])
      html = renderer.create(<Auth0Provider getLogoutUrl={() => {}}>children</Auth0Provider>)
      try {
        ;({ value } = Auth0Context.Provider.mock.calls[0][0])
      } catch (e) {
        console.log(e)
      }
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
    it(`should initialize Auth0`, () => {
      expect(initAuth0.mock.calls).toHaveLength(1)
      initAuth0.mockClear()
    })
    it(`should set up the context value`, () => {
      expect(Auth0Context.Provider.mock.calls).toHaveProperty([0, 0, `value`], value)
      Auth0Context.Provider.mockClear()
    })
    describe(`value.getTokenSilently`, () => {
      it(`should be a function`, () => {
        expect(value).toHaveProperty(`getTokenSilently`)
        expect(value.getTokenSilently).toBeInstanceOf(Function)
      })
      it(`should call auth0.getTokenSilently`, () => {
        client.getTokenSilently.mockReturnValueOnce(`foo`)
        expect(value.getTokenSilently({})).toBe(`foo`)
        expect(client.getTokenSilently.mock.calls).toEqual([[{}]])
      })
    })
  })
  describe(`Auth0Provider (client is null)`, () => {
    let html
    beforeAll(() => {
      useState.mockReturnValueOnce([null, () => {}])
      useState.mockReturnValueOnce([{}, () => {}])
      html = renderer.create(<Auth0Provider getLogoutUrl={() => {}}>children</Auth0Provider>)
    })
    it(`should render null`, () => {
      expect(html.toJSON()).toBeNull()
    })
    it(`should initialize Auth0`, () => {
      expect(initAuth0.mock.calls).toHaveLength(1)
      initAuth0.mockClear()
    })
  })
})