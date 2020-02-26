import makeLogoutFunction from "../makeLogoutFunction"
describe(`../makeLogoutFunction`, () => {
  jestUtils.describeDependencies({
    deps: [`@auth0/auth0-spa-js`],
    relativeBasePath: __dirname,
  })
  describe(`makeLogoutFunction (user {}, client {})`, () => {
    const logout = jest.fn()
    let result
    beforeAll(() => {
      result = makeLogoutFunction({}, { logout }, () => `logout URL`)
    })
    it(`should return a function`, () => {
      expect(result).toBeInstanceOf(Function)
    })
    describe(`logout`, () => {
      it(`should execute "client.logout"`, () => {
        result()
        expect(logout.mock.calls).toEqual([[{ returnTo: `logout URL` }]])
      })
    })
  })
  {
    const cases = [
      [{}, null],
      [null, {}],
      [null, null],
    ]
    describe.each(cases)(`makeLogoutFunction (user %j, client %j)`, (user, client) => {
      it(`should return a function that runs`, () => {
        const result = makeLogoutFunction(user, client, () => {})
        expect(result).toBeInstanceOf(Function)
        result()
      })
    })
  }
})