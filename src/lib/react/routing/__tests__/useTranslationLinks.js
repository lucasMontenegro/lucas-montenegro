import { useMemo } from "react"
import languageDetector from "lib/languageDetector"
import useTranslationLinks from "../useTranslationLinks"
jest.mock(`react`, () => ({ __esModule: true, useMemo: f => f() }))
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
describe(`../useTranslationLinks`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`useTranslationLinks (redirecting route)`, () => {
    let translationLinks
    beforeAll(() => {
      translationLinks = useTranslationLinks({
        languageCodes: [`en`, `es`, `pt`],
        languageNames: { en: `English`, es: `Spanish`, pt: `Portuguese` },
      }, {})
    })
    describe(`translationLinks.links`, () => {
      it(`should be an empty array`, () => {
        expect(translationLinks.links).toEqual([])
      })
    })
    describe.each([[true], [false]])(`translationLinks.get (render links %j)`, render => {
      it(`should return translationLinks.links`, () => {
        expect(translationLinks.get(render)).toEqual(translationLinks.links)
      })
    })
  })
  describe(`useTranslationLinks (client route)`, () => {
    let translationLinks
    beforeAll(() => {
      const routing = {
        languageCodes: [`en`, `es`, `pt`],
        languageNames: { en: `English`, es: `Spanish`, pt: `Portuguese` },
        linkTranslators: {
          foo: {
            en: { toLocal: str => ({ pathname: `${str}/to-english` }) },
            es: { toIntl: location => `${location.pathname}/to-intl` },
            pt: { toLocal: str => ({ pathname: `${str}/to-portuguese` }) },
          },
        },
      }
      languageDetector.get = () => `es`
      const route = { clientName: `foo`, location: { pathname: `/es/foo` } }
      translationLinks = useTranslationLinks(routing, route)
    })
    describe(`translationLinks.links`, () => {
      it(`should be empty`, () => {
        expect(`links` in translationLinks).toBe(false)
      })
    })
    {
      const msg = `translationLinks.get (translationLinks.links is available, render links %j)`
      describe.each([[true], [false]])(msg, render => {
        it(`should return de saved links`, () => {
          const links = translationLinks.links = []
          expect(translationLinks.get(render)).toBe(links)
        })
      })
    }
    {
      const msg = (
        `translationLinks.get (translationLinks.links is not available, render links true)`
      )
      describe(msg, () => {
        let result
        beforeAll(() => {
          delete translationLinks.links
          result = translationLinks.get(true)
        })
        it(`should create the translation links`, () => {
          expect(result).toEqual([
            {
              languageCode: `en`,
              location: { pathname: `/es/foo/to-intl/to-english` },
              text: `English`,
            },
            {
              languageCode: `pt`,
              location: { pathname: `/es/foo/to-intl/to-portuguese` },
              text: `Portuguese`,
            },
          ])
        })
        it(`should memoize the links`, () => {
          expect(translationLinks.links).toBe(result)
        })
      })
    }
    {
      const msg = (
        `translationLinks.get (translationLinks.links is not available, render links false)`
      )
      describe(msg, () => {
        let result
        beforeAll(() => {
          delete translationLinks.links
          result = translationLinks.get(false)
        })
        it(`should return an empty array`, () => {
          expect(result).toEqual([])
        })
        it(`should not memoize the links`, () => {
          expect(`links` in translationLinks).toBe(false)
        })
      })
    }
  })
})