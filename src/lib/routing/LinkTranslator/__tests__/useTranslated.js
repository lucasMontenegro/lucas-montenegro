import { useCallback } from "react"
import useTranslated from "lib/routing/LinkTranslator/useTranslated"
jest.mock(`react`, () => ({ __esModule: true, useCallback: jest.fn() }))
const linkTranslator = {
  useTranslated,
  translate: jest.fn(),
}
describe(`lib/routing/LinkTranslator/useTranslated`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`linkTranslator.useTranslated`, () => {
    const location = {}
    const getLinks = () => {}
    let result, callback
    beforeAll(() => {
      useCallback.mockReturnValueOnce(getLinks)
      result = linkTranslator.useTranslated(location)
      try {
        callback = useCallback.mock.calls[0][0]
      } catch (e) {}
    })
    it(`should not call linkTranslator.translate`, () => {
      expect(linkTranslator.translate.mock.calls).toEqual([])
    })
    it(`should set up useCallback`, () => {
      expect(useCallback.mock.calls).toHaveLength(1)
      expect(useCallback.mock.calls[0]).toHaveLength(2)
      expect(useCallback.mock.calls[0][0]).toBeInstanceOf(Function)
      expect(useCallback.mock.calls[0][1]).toEqual([{}])
      expect(useCallback.mock.calls[0][1][0]).toBe(location)
      useCallback.mockClear()
    })
    it(`should return the memoized callback`, () => {
      expect(result).toBe(getLinks)
    })
    describe(`callback (first call)`, () => {
      const links = []
      let callbackResult1
      beforeAll(() => {
        linkTranslator.translate.mockReturnValueOnce(links)
        callbackResult1 = callback()
      })
      it(`should not call any hook`, () => {
        expect(useCallback.mock.calls).toHaveLength(0)
      })
      it(`should translate the location`, () => {
        expect(linkTranslator.translate.mock.calls).toEqual([[{}]])
        expect(linkTranslator.translate.mock.calls[0][0]).toBe(location)
        linkTranslator.translate.mockClear()
      })
      it(`should return the translated links`, () => {
        expect(callbackResult1).toBe(links)
      })
      describe(`linkTranslator.useTranslated (subsequent calls)`, () => {
        let callbackResult2
        beforeAll(() => {
          callbackResult2 = callback()
        })
        it(`should not call any hook`, () => {
          expect(useCallback.mock.calls).toHaveLength(0)
        })
        it(`should not call linkTranslator.translate`, () => {
          expect(linkTranslator.translate.mock.calls).toHaveLength(0)
        })
        it(`should return the memoized links`, () => {
          expect(callbackResult1).toBe(links)
        })
      })
    })
  })
})