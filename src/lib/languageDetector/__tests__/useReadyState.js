import { useLayoutEffect, useState } from "react"
import i18next from "i18next"
import useReadyState from "lib/languageDetector/useReadyState"
jest.mock(`react`, () => ({
  __esModule: true,
  useState: jest.fn(),
  useLayoutEffect: jest.fn(),
}))
let ready
const setReady = jest.fn()
useState.mockImplementation(() => [ready, setReady])
jest.mock(`i18next`, () => ({
  __esModule: true,
  default: { on: jest.fn(), off: jest.fn() },
}))
describe(`lib/languageDetector/useReadyState`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `i18next`])).toMatchSnapshot()
  })
  {
    const msg = `useReadyState first render (ready false, isInitialized %j)`
    describe.each([[true], [false]])(msg, initialized => {
      let result, effect
      const getEffect = () => effect || (effect = useLayoutEffect.mock.calls[0][0])
      beforeAll(() => {
        ready = false
        i18next.isInitialized = initialized
        result = useReadyState()
      })
      it(`should set up the initial state`, () => {
        expect(useState.mock.calls).toEqual([[false]])
        useState.mockClear()
      })
      it(`should set up the layout effect`, () => {
        expect(useLayoutEffect.mock.calls).toHaveLength(1)
        expect(useLayoutEffect.mock.calls[0]).toHaveLength(2)
        expect(getEffect()).toBeInstanceOf(Function)
        expect(useLayoutEffect.mock.calls[0][1]).toEqual([])
        useLayoutEffect.mockClear()
      })
      it(`should not call any other function`, () => {
        expect(setReady.mock.calls).toEqual([])
        expect(i18next.on.mock.calls).toEqual([])
        expect(i18next.off.mock.calls).toEqual([])
      })
      describe(`layout effect (isInitialized true)`, () => {
        let clearEffect
        beforeAll(() => {
          i18next.isInitialized = true
          clearEffect = getEffect()()
        })
        it(`should update the state`, () => {
          expect(setReady.mock.calls).toEqual([[true]])
          setReady.mockClear()
        })
        it(`should not call any other function`, () => {
          expect(useState.mock.calls).toEqual([])
          expect(useLayoutEffect.mock.calls).toEqual([])
          expect(i18next.on.mock.calls).toEqual([])
          expect(i18next.off.mock.calls).toEqual([])
        })
        it(`should not return anything`, () => {
          expect(clearEffect).toBeUndefined()
        })
      })
      describe(`layout effect (isInitialized false)`, () => {
        let clearEffect, handleInit
        const getInitHandler = () => handleInit || (handleInit = i18next.on.mock.calls[0][1])
        beforeAll(() => {
          i18next.isInitialized = false
          clearEffect = getEffect()()
        })
        it(`should handle "on initialized" events`, () => {
          expect(i18next.on.mock.calls).toHaveLength(1)
          expect(i18next.on.mock.calls[0]).toHaveLength(2)
          expect(i18next.on.mock.calls[0][0]).toBe(`initialized`)
          expect(getInitHandler()).toBeInstanceOf(Function)
          i18next.on.mockClear()
        })
        it(`should not call any other function`, () => {
          expect(useState.mock.calls).toEqual([])
          expect(setReady.mock.calls).toEqual([])
          expect(useLayoutEffect.mock.calls).toEqual([])
          expect(i18next.off.mock.calls).toEqual([])
        })
        it(`should return an effect cleanup function`, () => {
          expect(clearEffect).toBeInstanceOf(Function)
        })
        describe(`"on initialized" event handler`, () => {
          // at this point i18next.isInitialized is always true
          beforeAll(() => getInitHandler()())
          it(`should update the state`, () => {
            expect(setReady.mock.calls).toEqual([[true]])
            setReady.mockClear()
          })
          it(`should not call any other function`, () => {
            expect(useState.mock.calls).toEqual([])
            expect(useLayoutEffect.mock.calls).toEqual([])
            expect(i18next.on.mock.calls).toEqual([])
            expect(i18next.off.mock.calls).toEqual([])
          })
        })
        {
          const msg = `effect cleanup handler (isInitialized %j)`
          describe.each([[true], [false]])(msg, initialized => {
            beforeAll(() => {
              i18next.isInitialized = initialized
              clearEffect()
            })
            it(`should set off the event handler`, () => {
              expect(i18next.off.mock.calls).toHaveLength(1)
              expect(i18next.off.mock.calls[0]).toHaveLength(2)
              expect(i18next.off.mock.calls[0][0]).toBe(`initialized`)
              expect(i18next.off.mock.calls[0][1]).toBe(getInitHandler())
              i18next.off.mockClear()
            })
            it(`should not call any other function`, () => {
              expect(useState.mock.calls).toEqual([])
              expect(setReady.mock.calls).toEqual([])
              expect(useLayoutEffect.mock.calls).toEqual([])
              expect(i18next.off.mock.calls).toEqual([])
            })
          })
        }
      })
    })
  }
  {
    const msg = `useReadyState re-render (ready %j, isInitialized %j)`
    const cases = [
      [true, true],
      [true, false],
      [false, true],
      [false, false],
    ]
    describe.each(cases)(msg, (readyValue, isInitialized) => {
      let result
      beforeAll(() => {
        i18next.isInitialized = isInitialized
        ready = readyValue
        result = useReadyState()
      })
      it(`should read from the state`, () => {
        expect(useState.mock.calls).toEqual([[false]])
        useState.mockClear()
      })
      it(`should set up the layout effect`, () => {
        expect(useLayoutEffect.mock.calls).toHaveLength(1)
        expect(useLayoutEffect.mock.calls[0]).toHaveLength(2)
        expect(useLayoutEffect.mock.calls[0][0]).toBeInstanceOf(Function)
        expect(useLayoutEffect.mock.calls[0][1]).toEqual([])
        useLayoutEffect.mockClear()
      })
      it(`should not call any other function`, () => {
        expect(setReady.mock.calls).toEqual([])
        expect(i18next.on.mock.calls).toEqual([])
        expect(i18next.off.mock.calls).toEqual([])
      })
      it(`should return the value of "ready"`, () => {
        expect(result).toBe(readyValue)
      })
    })
  }
})