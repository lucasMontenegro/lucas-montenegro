import { useRef } from "react"
import useSmoothClosing from "lib/TranslationDialog/useSmoothClosing"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
const wasOpen = {}
const savedChildren = {}
function mockUseRef () {
  useRef.mockReturnValueOnce(wasOpen)
  useRef.mockReturnValueOnce(savedChildren)
}
describe(`lib/TranslationDialog/useSmoothClosing`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`useSmoothClosing (first render)`, () => {
    const children = []
    let result
    beforeAll(() => {
      wasOpen.current = false
      savedChildren.current = null
      mockUseRef()
      result = useSmoothClosing(false, children)
    })
    it(`should update the refs`, () => {
      expect(wasOpen).toEqual({ current: false })
      expect(savedChildren).toEqual({ current: [] })
      expect(savedChildren.current).toBe(children)
    })
    it(`should return the new children`, () => {
      expect(result).toBe(children)
    })
  })
  {
    const cases = [
      [true, true],
      [true, false],
      [false, false],
    ]
    const msg = `useSmoothClosing (isOpen %j, wasOpen %j)`
    describe.each(cases)(msg, (isOpen, wasOpenValue) => {
      const children = []
      let result
      beforeAll(() => {
        wasOpen.current = wasOpenValue
        savedChildren.current = {}
        mockUseRef()
        result = useSmoothClosing(isOpen, children)
      })
      it(`should update the refs`, () => {
        expect(wasOpen).toEqual({ current: isOpen })
        expect(savedChildren).toEqual({ current: [] })
        expect(savedChildren.current).toBe(children)
      })
      it(`should return the new children`, () => {
        expect(result).toBe(children)
      })
    })
  }
  describe(`useSmoothClosing (isOpen false, wasOpen true)`, () => {
    const oldChildren = []
    const newChildren = []
    let result
    beforeAll(() => {
      wasOpen.current = true
      savedChildren.current = oldChildren
      mockUseRef()
      result = useSmoothClosing(false, newChildren)
    })
    it(`should update the refs`, () => {
      expect(wasOpen).toEqual({ current: false })
      expect(savedChildren).toEqual({ current: [] })
      expect(savedChildren.current).toBe(newChildren)
    })
    it(`should return the old children`, () => {
      expect(result).toBe(oldChildren)
    })
  })
})