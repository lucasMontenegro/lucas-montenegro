import React, { useContext, useState, useRef } from "react"
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
    useRef: jest.fn(),
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
  {
    function itShouldInit (firstRender, getRedirectUri) {
      it(`should update the "firstRender" ref`, () => {
        expect(firstRender).toEqual({ current: false })
      })
      it(`should initialize Auth0`, () => {
        expect(initAuth0.mock.calls).toHaveLength(1)
        initAuth0.mockClear()
        expect(getRedirectUri()).toBeInstanceOf(Function)
      })
      describe(`redirectUri`, () => {
        it(`should create the redirection URI`, () => {
          expect(getRedirectUri()(`https://example.com`)).toMatchSnapshot()
        })
      })
    }
    function itShouldNotInit (firstRender) {
      it(`should not change the "firstRender" ref`, () => {
        expect(firstRender).toEqual({ current: false })
      })
      it(`should not call initAuth0`, () => {
        expect(initAuth0.mock.calls).toEqual([])
      })
    }
    const makeUri = h => `${h}/foo`
    const cases = [
      [{}, `with`, true, makeUri, itShouldInit],
      [{}, `with`, false, makeUri, itShouldNotInit],
      [{}, `without`, true, undefined, itShouldInit],
      [{}, `without`, false, undefined, itShouldNotInit],
      [null, `with`, true, makeUri, itShouldInit],
      [null, `with`, false, makeUri, itShouldNotInit],
      [null, `without`, true, undefined, itShouldInit],
      [null, `without`, false, undefined, itShouldNotInit],
    ]
    const msg = `Auth0Provider (client %j, %s "redirectUri" function, first render %j)`
    describe.each(cases)(msg, (client, str, firstRenderValue, redirectUriProp, testInit) => {
      const firstRender = { current: firstRenderValue }
      let html, redirectUri
      beforeAll(() => {
        useState.mockReturnValueOnce([client, () => {}])
        useState.mockReturnValueOnce([{}, () => {}])
        useRef.mockReturnValueOnce(firstRender)
        html = renderer.create(
          <Auth0Provider redirectUri={redirectUriProp} onLoginPopupTimeout={() => {}}>
            children
          </Auth0Provider>
        )
        try {
          redirectUri = initAuth0.mock.calls[0][0]
        } catch (e) {}
      })
      it(`should render`, () => {
        expect(html.toJSON()).toMatchSnapshot()
      })
      testInit(firstRender, () => redirectUri)
    })
  }
})