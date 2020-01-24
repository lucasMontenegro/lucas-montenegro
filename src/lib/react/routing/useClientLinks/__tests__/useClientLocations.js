import { useRef } from "react"
import languageDetector from "lib/languageDetector"
import useClientLocations from "../useClientLocations"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
describe(`../useClientLocations`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`useClientLocations (redirecting route)`, () => {
    const refValue = {}
    const ref = { current: refValue }
    let result
    beforeAll(() => {
      useRef.mockReturnValueOnce(ref)
      result = useClientLocations({}, {})
    })
    it(`should return null`, () => {
      expect(result).toEqual(null)
    })
    it(`should not mutate the ref`, () => {
      expect(ref).toEqual({ current: {} })
      expect(ref.current).toBe(refValue)
    })
  })
  {
    const cases = [
      [`ref is null`, null],
      [`new routing object`, { routing: {} }],
    ]
    describe.each(cases)(`useClientLocations (client route, %s)`, (str, refValue) => {
      const ref = { current: refValue }
      const routing = {
        clientNames: [`foo`, `bar`, `baz`],
        translatedLocations: {
          foo: { get: () => ({ pathname: `/foo` }) },
          bar: { get: () => ({ pathname: `/bar` }) },
          baz: { get: () => ({ pathname: `/baz` }) },
        },
      }
      const barLocation = { pathname: `/bar`, search: `&x=1` }
      const route = { clientName: `bar`, location: barLocation }
      let result
      beforeAll(() => {
        useRef.mockReturnValueOnce(ref)
        languageDetector.get = () => `en`
        result = useClientLocations(routing, route)
      })
      it(`should return the initial locations`, () => {
        expect(result).toEqual({
          foo: { pathname: `/foo` },
          bar: { pathname: `/bar`, search: `&x=1` },
          baz: { pathname: `/baz` },
        })
        expect(result.bar).toBe(barLocation)
      })
      it(`should mutate the ref`, () => {
        expect(ref.current).not.toBe(refValue)
        expect(ref.current).toHaveProperty(`languageCode`, `en`)
        expect(ref.current).toHaveProperty(`routing`, routing)
        expect(ref.current).toHaveProperty(`route`, route)
        expect(ref.current).toHaveProperty(`locations`, result)
      })
    })
  }
  describe(`useClientLocations (client route, ref is not null, language change)`, () => {
    const routing = {
      clientNames: [`foo`, `bar`, `baz`],
      linkTranslators: {
        foo: {
          en: { toIntl: location => `${location.pathname}/to-intl` },
          es: { toLocal: str => ({ pathname: `${str}/to-spanish` }) },
        },
        baz: {
          en: { toIntl: location => `${location.pathname}/to-intl` },
          es: { toLocal: str => ({ pathname: `${str}/to-spanish` }) },
        },
      },
    }
    const refValue = {
      languageCode: `en`,
      locations: {
        foo: { pathname: `/foo` },
        bar: { pathname: `/bar` },
        baz: { pathname: `/baz` },
      },
      routing,
      route: {},
    }
    const ref = { current: refValue }
    const barLocation = { pathname: `/bar`, search: `&x=1` }
    const route = { clientName: `bar`, location: barLocation }
    let result
    beforeAll(() => {
      useRef.mockReturnValueOnce(ref)
      languageDetector.get = () => `es`
      result = useClientLocations(routing, route)
    })
    it(`should return the translated locations`, () => {
      expect(result).toEqual({
        foo: { pathname: `/foo/to-intl/to-spanish` },
        bar: { pathname: `/bar`, search: `&x=1` },
        baz: { pathname: `/baz/to-intl/to-spanish` },
      })
      expect(result.bar).toBe(barLocation)
    })
    it(`should mutate the ref`, () => {
      expect(ref.current).not.toBe(refValue)
      expect(ref.current).toHaveProperty(`languageCode`, `es`)
      expect(ref.current).toHaveProperty(`routing`, routing)
      expect(ref.current).toHaveProperty(`route`, route)
      expect(ref.current).toHaveProperty(`locations`, result)
    })
  })
  describe(`useClientLocations (client route, ref is not null, route change)`, () => {
    const routing = {}
    const fooLocation = { pathname: `/foo` }
    const bazLocation = { pathname: `/baz` }
    const refValue = {
      languageCode: `en`,
      locations: { foo: fooLocation, bar: { pathname: `/bar` }, baz: bazLocation },
      routing,
      route: {},
    }
    const ref = { current: refValue }
    const barLocation = { pathname: `/bar`, search: `&x=1` }
    const route = { clientName: `bar`, location: barLocation }
    let result
    beforeAll(() => {
      useRef.mockReturnValueOnce(ref)
      languageDetector.get = () => `en`
      result = useClientLocations(routing, route)
    })
    it(`should return the updated locations`, () => {
      expect(result).toEqual({
        foo: { pathname: `/foo` },
        bar: { pathname: `/bar`, search: `&x=1` },
        baz: { pathname: `/baz` },
      })
      expect(result.foo).toBe(fooLocation)
      expect(result.bar).toBe(barLocation)
      expect(result.baz).toBe(bazLocation)
    })
    it(`should mutate the ref`, () => {
      expect(ref.current).not.toBe(refValue)
      expect(ref.current).toHaveProperty(`languageCode`, `en`)
      expect(ref.current).toHaveProperty(`routing`, routing)
      expect(ref.current).toHaveProperty(`route`, route)
      expect(ref.current).toHaveProperty(`locations`, result)
    })
  })
  describe(`useClientLocations (client route, ref is not null, same language)`, () => {
    const routing = {}
    const route = { clientName: `bar` }
    const locations = {
      foo: { pathname: `/foo` },
      bar: { pathname: `/bar` },
      baz: { pathname: `/baz` },
    }
    const refValue = { languageCode: `en`, locations, routing, route }
    const ref = { current: refValue }
    let result
    beforeAll(() => {
      useRef.mockReturnValueOnce(ref)
      languageDetector.get = () => `en`
      result = useClientLocations(routing, route)
    })
    it(`should return the saved locations`, () => {
      expect(result).toBe(locations)
    })
    it(`should not mutate the ref`, () => {
      expect(ref.current).toBe(refValue)
      expect(ref.current).toHaveProperty(`languageCode`, `en`)
      expect(ref.current).toHaveProperty(`routing`, routing)
      expect(ref.current).toHaveProperty(`route`, route)
      expect(ref.current).toHaveProperty(`locations`, result)
    })
  })
})