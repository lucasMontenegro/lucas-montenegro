import { useRef } from "react"
import useTranslated from "lib/routing/LinkTranslator/useTranslated"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
const savedLocation = {}
const savedLinks = {}
{
  const obj = { savedLocation, savedLinks }
  useRef.mockImplementation(str => obj[str])
}
describe(`lib/routing/LinkTranslator/useTranslated`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  const linkTranslator = {
    useTranslated,
    translate: jest.fn(),
  }
  describe(`linkTranslator.useTranslated (same location)`, () => {
    const location = {}
    const links = []
    let result
    beforeAll(() => {
      savedLocation.current = location
      savedLinks.current = links
      result = linkTranslator.useTranslated(location)()
    })
    it(`should not call linkTranslator.translate`, () => {
      expect(linkTranslator.translate.mock.calls).toEqual([])
    })
    it(`should not update the refs`, () => {
      expect(savedLocation).toEqual({ current: {} })
      expect(savedLocation.current).toBe(location)
      expect(savedLinks).toEqual({ current: [] })
      expect(savedLinks.current).toBe(links)
    })
    it(`should return the stored links`, () => {
      expect(result).toBe(links)
    })
  })
  describe(`linkTranslator.useTranslated (new location)`, () => {
    const location = {}
    const links = []
    let result
    beforeAll(() => {
      savedLocation.current = {}
      savedLinks.current = []
      linkTranslator.translate.mockReturnValueOnce(links)
      result = linkTranslator.useTranslated(location)()
    })
    it(`should call linkTranslator.translate`, () => {
      expect(linkTranslator.translate.mock.calls).toEqual([[{}]])
      expect(linkTranslator.translate.mock.calls[0][0]).toBe(location)
      linkTranslator.translate.mockClear()
    })
    it(`should update the refs`, () => {
      expect(savedLocation).toEqual({ current: {} })
      expect(savedLocation.current).toBe(location)
      expect(savedLinks).toEqual({ current: [] })
      expect(savedLinks.current).toBe(links)
    })
    it(`should return the stored links`, () => {
      expect(result).toBe(links)
    })
  })
})