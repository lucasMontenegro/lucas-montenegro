import findRoute from "lib/routing/Router/findRoute"
describe(`lib/routing/Router/findRoute`, () => {
  const makeRouter = () => ({ findRoute })
  const location = {}
  const route = {}
  function mockReturnRoute (router, str) {
    router[str] = () => route
  }
  function mockReturnNull (router, arr) {
    arr.reduce((router, str) => {
      router[str] = () => null
      return router
    }, router)
  }
  function expectReturnValue (router) {
    expect(router.findRoute(location)).toBe(route)
  }
  it(`should find the root route`, () => {
    const router = makeRouter()
    mockReturnRoute(router, `findRoot`)
    expectReturnValue(router)
  })
  it(`should find the language root route`, () => {
    const router = makeRouter()
    mockReturnNull(router, [`findRoot`])
    mockReturnRoute(router, `findLanguageOnly`)
    expectReturnValue(router)
  })
  it(`should find the client route`, () => {
    const router = makeRouter()
    mockReturnNull(router, [`findRoot`, `findLanguageOnly`])
    mockReturnRoute(router, `findClient`)
    expectReturnValue(router)
  })
  it(`should handle locations that don't match any known client`, () => {
    const router = makeRouter()
    mockReturnNull(router, [`findRoot`, `findLanguageOnly`, `findClient`])
    mockReturnRoute(router, `findUnknownClient`)
    expectReturnValue(router)
  })
  it(`should redirect when no route is found`, () => {
    const router = makeRouter()
    mockReturnNull(router, [`findRoot`, `findLanguageOnly`, `findClient`, `findUnknownClient`])
    mockReturnRoute(router, `redirect404`)
    expectReturnValue(router)
  })
})