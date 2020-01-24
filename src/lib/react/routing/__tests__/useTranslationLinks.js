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
    let getTranslationLinks
    beforeAll(() => {
      getTranslationLinks = useTranslationLinks({
        languageCodes: [`en`, `es`, `pt`],
        languageNames: { en: `English`, es: `Spanish`, pt: `Portuguese` },
      }, {})
    })
    it(`should return an empty array`, () => {
      expect(getTranslationLinks()).toEqual([])
    })
    it(`should memoize the links`, () => {
      expect(getTranslationLinks()).toBe(getTranslationLinks())
    })
  })
  describe(`useTranslationLinks (client route)`, () => {
    let getTranslationLinks
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
      getTranslationLinks = useTranslationLinks(routing, route)
    })
    it(`should create the translation links`, () => {
      expect(getTranslationLinks()).toEqual([
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
      expect(getTranslationLinks()).toBe(getTranslationLinks())
    })
  })
})