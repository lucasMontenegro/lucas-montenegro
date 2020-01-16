import languageDetector from "lib/languageDetector"
import extend from "../extend"
import routing from "../routingExample"
import Router from "../Router"
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
jest.mock(`../extend`, () => ({ __esModule: true, default: x => x }))
routing.translatedLocations = {
  home: { get: () => ({ pathname: `/translated-home-location` }) },
  notFound: { get: () => ({ pathname: `/translated-notFound-location` }) },
}
describe(`../Router`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react-router-dom`])).toMatchSnapshot()
  })
  describe(`new Router`, () => {
    let router
    beforeAll(() => {
      router = new Router(routing)
    })
    it(`should set up the instance`, () => {
      expect(router.matchers).toBe(routing.matchers)
      expect(router.locations).toBe(routing.translatedLocations)
    })
    describe(`router.findRoute (root route)`, () => {
      let route
      beforeAll(() => {
        route = router.findRoute({ pathname: `/react/routing` })
      })
      it(`should return a route that redirects to home`, () => {
        expect(route).toEqual({
          location: { pathname: `/react/routing` },
          render: {},
          redirect: { pathname: `/translated-home-location` },
        })
      })
    })
    describe(`router.findRoute (language-only route)`, () => {
      let route
      const setLanguage = jest.fn()
      beforeAll(() => {
        languageDetector.set = setLanguage
        route = router.findRoute({ pathname: `/react/routing/en` })
        delete languageDetector.set
      })
      it(`should return a route that redirects to home`, () => {
        expect(route).toEqual({
          location: { pathname: `/react/routing/en` },
          render: {},
          redirect: { pathname: `/translated-home-location` },
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
        route = router.findRoute({ pathname: `/react/routing/es/foo/8` })
        delete languageDetector.set
      })
      it(`should return a route that renders the proper client`, () => {
        expect(route).toEqual({
          location: { pathname: `/react/routing/es/foo/8` },
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
      const setLanguage = jest.fn()
      const location = { pathname: `/react/routing/en/bar` }
      beforeAll(() => {
        languageDetector.set = setLanguage
        route = router.findRoute(location)
        delete languageDetector.set
      })
      it(`should return a route that redirects to notFound`, () => {
        expect(route).toEqual({
          location,
          render: {},
          redirect: {
            pathname: `/translated-notFound-location`,
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
        route = router.findRoute(location)
      })
      it(`should return a route that redirects to notFound`, () => {
        expect(route).toEqual({
          location,
          render: {},
          redirect: {
            pathname: `/translated-notFound-location`,
            state: { pathname: `/react/routing/404` },
          },
        })
        expect(route.redirect.state).toBe(location)
      })
    })
  })
})