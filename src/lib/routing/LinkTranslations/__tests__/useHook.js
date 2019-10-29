import { useRef } from "react"
import useHook from "lib/routing/LinkTranslations/useHook"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
const savedLocation = {}
const savedLinks = {}
{
  const obj = { savedLocation, savedLinks }
  useRef.mockImplementation(str => obj[str])
}
describe(`lib/routing/LinkTranslations/useHook`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  const linkTranslations = {
    useHook,
    translate: jest.fn(),
  }
  describe(`linkTranslations.useHook (same location)`, () => {
    const location = {}
    const links = []
    let result
    beforeAll(() => {
      savedLocation.current = location
      savedLinks.current = links
      result = linkTranslations.useHook(`foo`, location)()
    })
    it(`should not call linkTranslations.translate`, () => {
      expect(linkTranslations.translate.mock.calls).toEqual([])
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
  describe(`linkTranslations.useHook (new location)`, () => {
    const location = {}
    const links = []
    let result
    beforeAll(() => {
      savedLocation.current = {}
      savedLinks.current = []
      linkTranslations.translate.mockReturnValueOnce(links)
      result = linkTranslations.useHook(`foo`, location)()
    })
    it(`should call linkTranslations.translate`, () => {
      expect(linkTranslations.translate.mock.calls).toEqual([[`foo`, {}]])
      expect(linkTranslations.translate.mock.calls[0][1]).toBe(location)
      linkTranslations.translate.mockClear()
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