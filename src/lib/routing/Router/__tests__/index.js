import useRoute from "lib/routing/Router/useRoute"
import findRoute from "lib/routing/Router/findRoute"
import findRoot from "lib/routing/Router/findRoot"
import findLanguageOnly from "lib/routing/Router/findLanguageOnly"
import findClient from "lib/routing/Router/findClient"
import findUnknownClient from "lib/routing/Router/findUnknownClient"
import redirect404 from "lib/routing/Router/redirect404"
import Router from "lib/routing/Router"
jest.mock(`lib/routing/Router/useRoute`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findRoute`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findRoot`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findLanguageOnly`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findClient`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findUnknownClient`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/redirect404`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/Router`, () => {
  describe(`Router.prototype`, () => {
    it(`should expose methods`, () => {
      expect(Router.prototype.useRoute).toBe(useRoute)
      expect(Router.prototype.findRoute).toBe(findRoute)
      expect(Router.prototype.findRoot).toBe(findRoot)
      expect(Router.prototype.findLanguageOnly).toBe(findLanguageOnly)
      expect(Router.prototype.findClient).toBe(findClient)
      expect(Router.prototype.findUnknownClient).toBe(findUnknownClient)
      expect(Router.prototype.redirect404).toBe(redirect404)
      expect(Object.keys(Router.prototype)).toHaveLength(7)
    })
  })
  describe(`new Router`, () => {
    let router
    const routing = {
      languageCodes: [`en`, `es`],
      clientNames: [`home`, `foo`, `notFound`],
      locations: {
        home: { pathname: `initial home` },
        notFound: { pathname: `initial notFound` },
      },
      linkTranslators: {
        home: {
          en: {
            toIntl ({ pathname }) {
              return `${pathname} > home.en.toIntl`
            },
            toLocal (str) {
              return { pathname: `${str} > home.en.toLocal` }
            },
          },
          es: {
            toLocal (str) {
              return { pathname: `${str} > home.es.toLocal` }
            },
          },
        },
        notFound: {
          en: {
            toIntl ({ pathname }) {
              return `${pathname} > notFound.en.toIntl`
            },
            toLocal (str) {
              return { pathname: `${str} > notFound.en.toLocal` }
            },
          },
          es: {
            toLocal (str) {
              return { pathname: `${str} > notFound.es.toLocal` }
            },
          },
        },
      },
      matchers: {
        client: [
          { clientName: `home`, other: `other` },
          { clientName: `foo`, other: `other` },
          { clientName: `notFound`, other: `other` },
        ],
        other: `other`,
      },
    }
    beforeAll(() => {
      router = new Router(routing)
    })
    it(`should create the initial client locations`, () => {
      expect(router.locations).toEqual({
        home: {
          en: { pathname: `initial home` },
          es: { pathname: `initial home > home.en.toIntl > home.es.toLocal` },
        },
        notFound: {
          en: { pathname: `initial notFound` },
          es: { pathname: `initial notFound > notFound.en.toIntl > notFound.es.toLocal` },
        },
      })
    })
    it(`should create the "render" object that hides all clients`, () => {
      expect(router.renderEmpty).toEqual({ home: false, foo: false, notFound: false })
    })
    it(`should add the "render" object to each matcher`, () => {
      expect(router.matchers).toEqual({
        client: [
          {
            render: { home: true, foo: false, notFound: false },
            other: `other`,
          },
          {
            render: { home: false, foo: true, notFound: false },
            other: `other`,
          },
          {
            render: { home: false, foo: false, notFound: true },
            other: `other`,
          },
        ],
        other: `other`,
      })
    })
    it(`should not expose anything else`, () => {
      expect(Object.keys(router)).toHaveLength(3)
    })
  })
})