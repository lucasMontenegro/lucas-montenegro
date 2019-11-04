import { useMemo } from "react"
import useRoute from "lib/routing/Router/useRoute"
jest.mock(`react`, () => ({ __esModule: true, useMemo: jest.fn() }))
describe(`lib/routing/Router/useRoute`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`useRoute`, () => {
    const location = {}
    const route = {}
    const router = { useRoute, findRoute: jest.fn() }
    let result, memo
    beforeAll(() => {
      useMemo.mockReturnValueOnce(route)
      result = router.useRoute(location)
      try {
        memo = useMemo.mock.calls[0][0]
      } catch (e) {}
    })
    it(`should set the useMemo hook`, () => {
      expect(useMemo.mock.calls).toHaveLength(1)
      expect(useMemo.mock.calls[0]).toHaveLength(2)
      expect(useMemo.mock.calls[0][0]).toBeInstanceOf(Function)
      expect(useMemo.mock.calls[0][1]).toEqual([{}])
      expect(useMemo.mock.calls[0][1][0]).toBe(location)
      useMemo.mockClear()
    })
    it(`should not call router.findRoute`, () => {
      expect(router.findRoute.mock.calls).toHaveLength(0)
    })
    it(`should return the memoized route object`, () => {
      expect(result).toBe(route)
    })
    describe(`useMemo callback`, () => {
      let memoResult
      beforeAll(() => {
        router.findRoute.mockReturnValueOnce(route)
        memoResult = memo()
      })
      it(`should not call any hook`, () => {
        expect(useMemo.mock.calls).toHaveLength(0)
      })
      it(`should find the route and return it`, () => {
        expect(router.findRoute.mock.calls).toEqual([[{}]])
        expect(router.findRoute.mock.calls[0][0]).toBe(location)
        router.findRoute.mockClear()
        expect(memoResult).toBe(route)
      })
    })
  })
})