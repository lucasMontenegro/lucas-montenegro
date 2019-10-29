import translate from "lib/routing/LinkTranslations/translate"
import useHook from "lib/routing/LinkTranslations/useHook"
import LinkTranslations from "lib/routing/LinkTranslations"
jest.mock(`lib/routing/LinkTranslations/translate`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/LinkTranslations/useHook`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/LinkTranslations`, () => {
  describe(`LinkTranslations.prototype`, () => {
    it(`should expose methods`, () => {
      expect(LinkTranslations.prototype.translate).toBe(translate)
      expect(LinkTranslations.prototype.useHook).toBe(useHook)
      expect(Object.keys(LinkTranslations.prototype)).toHaveLength(2)
    })
  })
  describe(`new LinkTranslations`, () => {
    it(`should set up the instance`, () => {
      const routing = {
        languageCodes: [`en`, `es`],
        languageNames: { es: `Spanish`, en: `English` },
        linkTranslators: { foo: {} },
      }
      const linkTranslations = new LinkTranslations(`foo`, routing)
      expect(linkTranslations.translators).toBe(routing.linkTranslators.foo)
      expect(linkTranslations.links).toEqual([
        { languageCode: `en`, languageName: `English` },
        { languageCode: `es`, languageName: `Spanish` },
      ])
      expect(Object.keys(linkTranslations)).toHaveLength(2)
    })
  })
})