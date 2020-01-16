import translate from "lib/routing/LinkTranslator/translate"
import useTranslated from "lib/routing/LinkTranslator/useTranslated"
import LinkTranslator from "lib/routing/LinkTranslator"
jest.mock(`lib/routing/LinkTranslator/translate`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/LinkTranslator/useTranslated`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/LinkTranslator`, () => {
  describe(`LinkTranslator.prototype`, () => {
    it(`should expose methods`, () => {
      expect(LinkTranslator.prototype.translate).toBe(translate)
      expect(LinkTranslator.prototype.useTranslated).toBe(useTranslated)
      expect(Object.keys(LinkTranslator.prototype)).toHaveLength(2)
    })
  })
  describe(`new LinkTranslator`, () => {
    it(`should set up the instance`, () => {
      const routing = {
        languageCodes: [`en`, `es`],
        languageNames: { es: `Spanish`, en: `English` },
        linkTranslators: { foo: {} },
      }
      const linkTranslator = new LinkTranslator(`foo`, routing)
      expect(linkTranslator.functions).toBe(routing.linkTranslators.foo)
      expect(linkTranslator.links).toEqual([
        {
          languageCode: `en`,
          otherProps: {
            key: `en`,
            id: `translate-to-en`,
            text: `English`,
          },
        },
        {
          languageCode: `es`,
          otherProps: {
            key: `es`,
            id: `translate-to-es`,
            text: `Spanish`,
          },
        },
      ])
      expect(Object.keys(linkTranslator)).toHaveLength(2)
    })
  })
})