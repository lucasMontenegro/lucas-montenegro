import React, { createContext, useContext } from "react"
import { RoutingContext, RoutingProvider, useRoute, useRoutingContext } from "../context"
import renderer from "react-test-renderer"
jest.mock(`react`, () => {
  const React = jest.requireActual(`react`)
  return {
    ...React,
    __esModule: true,
    default: React,
    createContext: jest.fn(() => ({
      Provider: props => <div {...props} className="RoutingContextProvider" />,
    })),
    useMemo: fn => fn(),
    useContext: jest.fn(),
  }
})
jest.mock(`../Router`, () => ({
  __esModule: true,
  default: class Router {
    findRoute () {
      return { clientName: `foo`, render: { foo: true }, location: { pathname: `/foo` } }
    }
  },
}))
jest.mock(`../useClientLinks`, () => ({
  __esModule: true,
  default: () => [
    {
      active: true,
      clientName: `foo`,
      location: { pathname: `/foo` },
      render: {
        text: { en: () => `en foo`, es: () => `es foo` },
        Icon: () => `foo icon`,
      },
    },
  ],
}))
jest.mock(`../useTranslationLinks`, () => ({
  __esModule: true,
  default: () => ({
    links: [
      { languageCode: `es`, text: `spanish`, location: { pathname: `/foo/es` } },
    ],
    get () {},
  }),
}))
describe(`../context`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`RoutingContext`, () => {
    it(`should be configured properly`, () => {
      expect(createContext.mock.calls).toMatchSnapshot()
      createContext.mockClear()
      expect(RoutingContext).toMatchSnapshot()
    })
  })
  describe(`RoutingProvider`, () => {
    it(`should render`, () => {
      expect(renderer.create(
        <RoutingProvider routing={{ clientNames: [`foo`], languageCodes: [`en`, `es`] }}>
          children
        </RoutingProvider>
      ).toJSON()).toMatchSnapshot()
    })
  })
  describe(`useRoute`, () => {
    it(`should return the route object from the context`, () => {
      const route = {}
      useContext.mockReturnValueOnce({ route })
      expect(useRoute()).toBe(route)
      expect(useContext.mock.calls[0][0]).toBe(RoutingContext)
      useContext.mockClear()
    })
  })
  describe(`useRoute`, () => {
    it(`should return the context value`, () => {
      const context = {}
      useContext.mockReturnValueOnce(context)
      expect(useRoutingContext()).toBe(context)
      expect(useContext.mock.calls[0][0]).toBe(RoutingContext)
      useContext.mockClear()
    })
  })
})