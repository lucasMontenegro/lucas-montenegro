import { useRef } from "react"
import languageDetector from "lib/languageDetector"
import useRoute from "lib/routing/Router/useRoute"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
const savedLocation = {}
const savedRoute = {}
useRef.mockImplementation(str => str === `savedLocation` ? savedLocation : savedRoute)
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { useReadyState: jest.fn() },
}))
const renderEmpty = {}
const router = { useRoute, findRoute: jest.fn(), renderEmpty }
function testHooks () {
  it(`should set up React hooks`, () => {
    expect(languageDetector.useReadyState.mock.calls).toEqual([[]])
    languageDetector.useReadyState.mockClear()
    expect(useRef.mock.calls).toEqual([[`savedLocation`], [`savedRoute`]])
    useRef.mockClear()
  })
}
describe(`lib/routing/Router/useRoute`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  const newLocation = {}
  const oldLocation = {}
  const newRoute = {}
  const oldRoute = {}
  describe.each([
    [true, newLocation],
    [false, oldLocation],
  ])(`useRoute (ready false, locationIsNew %j)`, location => {
    let result
    beforeAll(() => {
      languageDetector.useReadyState.mockReturnValueOnce(false)
      savedLocation.current = oldLocation
      savedRoute.current = `savedRoute`
      result = router.useRoute(location)
    })
    testHooks()
    it(`should not call router.findRoute`, () => {
      expect(router.findRoute.mock.calls).toEqual([])
    })
    it(`should not mutate the refs`, () => {
      expect(savedLocation).toEqual({ current: {} })
      expect(savedLocation.current).toBe(oldLocation)
      expect(savedRoute).toEqual({ current: `savedRoute` })
    })
    it(`should return a route that renders nothing`, () => {
      expect(result).toEqual({ render: {}, languageCode: `en`, redirect: null })
      expect(result.render).toBe(router.renderEmpty)
    })
  })
  describe(`useRoute (ready true, locationIsNew false)`, () => {
    let result
    beforeAll(() => {
      languageDetector.useReadyState.mockReturnValueOnce(true)
      savedLocation.current = oldLocation
      savedRoute.current = oldRoute
      result = router.useRoute(oldLocation)
    })
    testHooks()
    it(`should not call router.findRoute`, () => {
      expect(router.findRoute.mock.calls).toEqual([])
    })
    it(`should not mutate the refs`, () => {
      expect(savedLocation).toEqual({ current: {} })
      expect(savedLocation.current).toBe(oldLocation)
      expect(savedRoute).toEqual({ current: {} })
      expect(savedRoute.current).toBe(oldRoute)
    })
    it(`should return the saved route`, () => {
      expect(result).toBe(oldRoute)
    })
  })
  describe(`useRoute (ready true, locationIsNew true)`, () => {
    let result
    beforeAll(() => {
      languageDetector.useReadyState.mockReturnValueOnce(true)
      savedLocation.current = oldLocation
      savedRoute.current = oldRoute
      router.findRoute.mockReturnValueOnce(newRoute)
      result = router.useRoute(newLocation)
    })
    testHooks()
    it(`should call router.findRoute`, () => {
      expect(router.findRoute.mock.calls).toEqual([[{}]])
      expect(router.findRoute.mock.calls[0][0]).toBe(newLocation)
    })
    it(`should update the refs`, () => {
      expect(savedLocation).toEqual({ current: {} })
      expect(savedLocation.current).toBe(newLocation)
      expect(savedRoute).toEqual({ current: {} })
      expect(savedRoute.current).toBe(newRoute)
    })
    it(`should return the new route`, () => {
      expect(result).toBe(newRoute)
    })
  })
})