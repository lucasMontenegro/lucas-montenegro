import { useRef } from "react"
import languageDetector from "lib/languageDetector"
import useClientLocation from "lib/routing/ClientNavigator/useClientLocation"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
const savedLanguage = {}
const savedLocation = {}
function mockUseRef () {
  useRef.mockReturnValueOnce(savedLanguage)
  useRef.mockReturnValueOnce(savedLocation)
}
function testUseRef (clientNavigator) {
  it(`should set up the React refs`, () => {
    expect(useRef.mock.calls).toEqual([[{}], [{}]])
    expect(useRef.mock.calls[0][0]).toBe(clientNavigator.initialLanguage)
    expect(useRef.mock.calls[1][0]).toBe(clientNavigator.initialLocation)
    useRef.mockClear()
  })
}
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/ClientNavigator/useClientLocation`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  {
    const clientNavigator = {
      useClientLocation,
      initialLanguage: {},
      initialLocation: {},
    }
    const cases = [[`en`, `en`], [`en`, `es`]]
    const msg = `useClientLocation (match true, oldLanguage %s, newLanguage %s)`
    describe.each(cases)(msg, (oldLanguage, newLanguage) => {
      const location = {}
      let result
      beforeAll(() => {
        languageDetector.get = () => newLanguage
        savedLanguage.current = oldLanguage
        savedLocation.current = {}
        mockUseRef()
        result = clientNavigator.useClientLocation(true, location)
      })
      testUseRef(clientNavigator)
      it(`should update the refs`, () => {
        expect(savedLanguage).toEqual({ current: newLanguage })
        expect(savedLocation).toEqual({ current: {} })
        expect(savedLocation.current).toBe(location)
      })
      it(`should return the saved location`, () => {
        expect(result).toBe(savedLocation.current)
      })
    })
  }
  describe(`useClientLocation (match false, oldLanguage en, newLanguage es)`, () => {
    const clientNavigator = {
      useClientLocation,
      initialLanguage: {},
      initialLocation: {},
      translators: {
        en: {
          toIntl (location) {
            return [`translators.en.toIntl`, location]
          },
        },
        es: {
          toLocal ([str, location]) {
            return {
              pathname: `translated location`,
              state: {
                original: location,
                toIntl: str,
                toLocal: `translators.es.toLocal`,
              },
            }
          },
        },
      },
    }
    const location = { pathname: `saved location` }
    let result
    beforeAll(() => {
      languageDetector.get = () => `es`
      savedLanguage.current = `en`
      savedLocation.current = location
      mockUseRef()
      result = clientNavigator.useClientLocation(false, { pathname: `new location` })
    })
    testUseRef(clientNavigator)
    it(`should update the refs`, () => {
      expect(savedLanguage).toEqual({ current: `es` })
      expect(savedLocation).toEqual({
        current: {
          pathname: `translated location`,
          state: {
            original: { pathname: `saved location` },
            toIntl: `translators.en.toIntl`,
            toLocal: `translators.es.toLocal`,
          },
        },
      })
      expect(savedLocation.current.state.original).toBe(location)
    })
    it(`should return the saved location`, () => {
      expect(result).toBe(savedLocation.current)
    })
  })
  describe(`useClientLocation (match false, oldLanguage en, newLanguage en)`, () => {
    const clientNavigator = {
      useClientLocation,
      initialLanguage: {},
      initialLocation: {},
    }
    const location = { pathname: `saved location` }
    let result
    beforeAll(() => {
      languageDetector.get = () => `en`
      savedLanguage.current = `en`
      savedLocation.current = location
      mockUseRef()
      result = clientNavigator.useClientLocation(false, { pathname: `new location` })
    })
    testUseRef(clientNavigator)
    it(`should not change the refs`, () => {
      expect(savedLanguage).toEqual({ current: `en` })
      expect(savedLocation).toEqual({ current: { pathname: `saved location` } })
      expect(savedLocation.current).toBe(location)
    })
    it(`should return the saved location`, () => {
      expect(result).toBe(savedLocation.current)
    })
  })
})