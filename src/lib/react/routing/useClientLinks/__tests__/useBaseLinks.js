import { useRef } from "react"
import useBaseLinks from "../useBaseLinks"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
describe(`../useBaseLinks`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`useBaseLinks (ref is not null)`, () => {
    const links = []
    const ref = { current: links }
    let result
    beforeAll(() => {
      useRef.mockReturnValueOnce(ref)
      result = useBaseLinks({})
    })
    it(`should return the saved array`, () => {
      expect(result).toBe(links)
    })
    it(`should not mutate the ref`, () => {
      expect(ref).toEqual({ current: [] })
      expect(ref.current).toBe(links)
    })
  })
  describe(`useBaseLinks (ref is null)`, () => {
    const ref = { current: null }
    let result
    beforeAll(() => {
      useRef.mockReturnValueOnce(ref)
      result = useBaseLinks({ foo: `Foo`, bar: `Bar`, baz: `Baz` })
    })
    it(`should create the links`, () => {
      expect(result).toEqual([
        { clientName: `foo`, render: `Foo` },
        { clientName: `bar`, render: `Bar` },
        { clientName: `baz`, render: `Baz` },
      ])
    })
    it(`should mutate the ref`, () => {
      expect(ref.current).toBe(result)
    })
  })
})