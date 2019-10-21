import { useRef } from "react"
import globals from "lib/utils/globals"
import useDiv from "lib/portals/useDiv"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { document: { createElement: jest.fn() } },
}))
describe(`lib/portals/useDiv`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  afterEach(() => useRef.mockClear())
  it(`should return null when the name is null`, () => {
    expect(useDiv(null)).toBeNull()
  })
  it(`should return the cached div`, () => {
    const div = {}
    useRef.mockReturnValueOnce({ current: div })
    expect(useDiv(`foo`)).toBe(div)
  })
  it(`should create a new div when is not already cached`, () => {
    const div = {}
    globals.document.createElement.mockReturnValueOnce(div)
    const ref = { current: null }
    useRef.mockReturnValueOnce(ref)
    expect(useDiv(`bar`)).toBe(div)
    expect(ref.current).toBe(div)
  })
  it(`should return the div stored in the namespace`, () => {
    const div = {}
    globals.document.createElement.mockReturnValueOnce(div)
    useRef.mockReturnValueOnce({ current: null })
    useDiv(`baz`)
    const ref = { current: null }
    useRef.mockReturnValueOnce(ref)
    expect(useDiv(`baz`)).toBe(div)
    expect(ref.current).toBe(div)
  })
})