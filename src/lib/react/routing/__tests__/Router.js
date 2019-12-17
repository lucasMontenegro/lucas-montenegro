import Translation from "lib/Translation"
import languageDetector from "lib/languageDetector"
import Router from "../Router"
import routing from "../routingExample"
jest.mock(`lib/Translation`, () => ({ __esModule: true, default: jest.fn() }))
let currentLanguage
Translation.mockImplementation(obj => ({ get: () => obj[currentLanguage] }))
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
describe(`../Router`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react-router-dom`])).toMatchSnapshot()
  })
  describe(`new Router`, () => {
    let router
    beforeAll(() => {
      router = new Router(routing)
    })
    {
      const msg = (
        `should create the initial client locations (client name %s, current language %s)`
      )
      const cases = [
        [`home`, `en`, { pathname: `/react/routing/en/home/2` }],
        [`home`, `es`, { pathname: `/react/routing/es/home/2` }],
        [`notFound`, `en`, { pathname: `/react/routing/en/notFound` }],
        [`notFound`, `es`, { pathname: `/react/routing/es/notFound` }],
      ]
      test.each(cases)(msg, (clientName, languageCode, expected) => {
        currentLanguage = languageCode
        expect(router.locations[clientName].get()).toEqual(expected)
      })
    }
    describe(`router.findRoute (root route)`, () => {
      let route
      beforeAll(() => {
        currentLanguage = `en`
        route = router.findRoute({ pathname: `/react/routing` })
      })
      it(`should return a route that redirects to home`, () => {
        expect(route).toEqual({
          render: {},
          redirect: { pathname: `/react/routing/en/home/2` },
        })
      })
    })
    describe(`router.findRoute (language-only route)`, () => {
      let route
      const setLanguage = jest.fn(str => {
        currentLanguage = str
      })
      beforeAll(() => {
        languageDetector.set = setLanguage
        currentLanguage = `es`
        route = router.findRoute({ pathname: `/react/routing/en` })
        delete languageDetector.set
      })
      it(`should return a route that redirects to home`, () => {
        expect(route).toEqual({
          render: {},
          redirect: { pathname: `/react/routing/en/home/2` },
        })
      })
      it(`should call languageDetector.set`, () => {
        expect(setLanguage.mock.calls).toEqual([[`en`]])
      })
    })
    describe(`router.findRoute (client route)`, () => {
      let route
      const setLanguage = jest.fn()
      beforeAll(() => {
        languageDetector.set = setLanguage
        currentLanguage = `en`
        route = router.findRoute({ pathname: `/react/routing/es/foo/8` })
        delete languageDetector.set
      })
      it(`should return a route that renders the proper client`, () => {
        expect(route).toEqual({
          clientName: `foo`,
          render: { foo: true },
          redirect: null,
        })
      })
      it(`should call languageDetector.set`, () => {
        expect(setLanguage.mock.calls).toEqual([[`es`]])
      })
    })
    describe(`router.findRoute (detect unknown client)`, () => {
      let route
      const setLanguage = jest.fn(str => {
        currentLanguage = str
      })
      const location = { pathname: `/react/routing/en/bar` }
      beforeAll(() => {
        languageDetector.set = setLanguage
        currentLanguage = `es`
        route = router.findRoute(location)
        delete languageDetector.set
      })
      it(`should return a route that redirects to notFound`, () => {
        expect(route).toEqual({
          render: {},
          redirect: {
            pathname: `/react/routing/en/notFound`,
            state: { pathname: `/react/routing/en/bar` },
          },
        })
        expect(route.redirect.state).toBe(location)
      })
      it(`should call languageDetector.set`, () => {
        expect(setLanguage.mock.calls).toEqual([[`en`]])
      })
    })
    describe(`router.findRoute (404 redirection)`, () => {
      let route
      const location = { pathname: `/react/routing/404` }
      beforeAll(() => {
        currentLanguage = `es`
        route = router.findRoute(location)
      })
      it(`should return a route that redirects to notFound`, () => {
        expect(route).toEqual({
          render: {},
          redirect: {
            pathname: `/react/routing/es/notFound`,
            state: { pathname: `/react/routing/404` },
          },
        })
        expect(route.redirect.state).toBe(location)
      })
    })
  })
})