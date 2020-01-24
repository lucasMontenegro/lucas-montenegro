import React from "react"
import renderer from "react-test-renderer"
import { RoutingProvider, useRoute, useRoutingContext } from "../context"
jest.mock(`react`, () => {
  const actual = jest.requireActual(`react`)
  return {
    ...actual,
    __esModule: true,
    default: actual,
    createContext: () => ({ Provider: () => null }),
    useMemo: fn => fn(),
    useContext: () => ({}),
  }
})
jest.mock(`../Router`, () => ({
  __esModule: true,
  default: class { findRoute () {} },
}))
jest.mock(`../useClientLinks`, () => ({ __esModule: true, default: () => {} }))
describe(`../context`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`RoutingProvider`, () => {
    it(`should run`, () => {
      renderer.create(<RoutingProvider />)
    })
  })
  describe(`useRoute`, () => {
    it(`should run`, () => {
      useRoute()
    })
  })
  describe(`useRoutingContext`, () => {
    it(`should run`, () => {
      useRoutingContext()
    })
  })
})