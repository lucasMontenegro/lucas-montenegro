jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
import { useRef } from "react"
const refs = { match: { current: null }, location: { current: null } }
{
  const arr = [refs.match, refs.location]
  let i = 0
  useRef.mockImplementation(function useRefMock () {
    const ref = arr[i++]
    i >= arr.length && (i = 0)
    return ref
  })
}

jest.mock(`./makeLanguageDetector`, () => ({ __esModule: true, default: jest.fn(() => `hmm`) }))
import makeLanguageDetector from "./makeLanguageDetector"
const useLanguageDetector = jest.fn()
makeLanguageDetector.mockReturnValue(useLanguageDetector)

function expectHookFunctionCalls () {
  expect(useLanguageDetector.mock.calls).toEqual([[]])
  expect(useRef.mock.calls).toEqual([[null], [null]])
  useLanguageDetector.mockClear()
  useRef.mockClear()
}

jest.mock(`./findRoute`, () => ({ __esModule: true, default: jest.fn() }))
import findRoute from "./findRoute"

jest.mock(`./matchPropType`, () => ({ __esModule: true, default: `matchPropType` }))

import makeRouter, { matchPropType } from "local/core/makeRouter"
describe(`local/core/makeRouter`, () => {
  it(`should re-export the match object prop-type`, () => {
    expect(matchPropType).toBe(`matchPropType`)
  })
  it(`should handle unavailable language detection`, () => {
    const useRouter = makeRouter(`routing`)
    useLanguageDetector.mockReturnValueOnce([null, `setDetectedLanguage`])
    expect(useRouter(`location`)).toEqual({ type: `initializing` })
    expectHookFunctionCalls()
    expect(findRoute.mock.calls.length).toBe(0)
  })
  it(`should find the route`, () => {
    const useRouter = makeRouter(`routing`)
    useLanguageDetector.mockReturnValueOnce([`foo`, `setDetectedLanguage`])
    findRoute.mockReturnValueOnce(`match`)
    expect(useRouter(`location`)).toBe(`match`)
    expectHookFunctionCalls()
    expect(findRoute.mock.calls).toEqual([[`routing`, `location`, `foo`, `setDetectedLanguage`]])
    findRoute.mockClear()
  })
  it(`should cache the result`, () => {
    const useRouter = makeRouter(`routing`)
    ;[`1`, `2`].forEach(x => { // see if the cache is updated
      const match = `match${x}`
      const location = `location${x}`
      findRoute.mockReturnValueOnce(match) // expected to be called just once
      ;[1, 2].forEach(() => { // run twice to trigger the cache
        useLanguageDetector.mockReturnValueOnce([`foo`, `setDetectedLanguage`])
        expect(useRouter(location)).toBe(match)
        expectHookFunctionCalls()
        expect(refs.location.current).toBe(location)
        expect(refs.match.current).toBe(match)
      })
      expect(findRoute.mock.calls).toEqual([[`routing`, location, `foo`, `setDetectedLanguage`]])
      findRoute.mockClear()
    })
  })
})