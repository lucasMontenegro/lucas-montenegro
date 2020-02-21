import makeLogoutFunction from "../makeLogoutFunction"
describe(`../makeLogoutFunction`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@auth0/auth0-spa-js`])).toMatchSnapshot()
  })
  describe(`makeLogoutFunction (ready true, authenticated true)`, () => {
    const logout = jest.fn()
    let result
    beforeAll(() => {
      result = makeLogoutFunction(true, true, { logout })
    })
    it(`should return a function`, () => {
      expect(result).toBeInstanceOf(Function)
    })
    describe(`returned function`, () => {
      it(`should execute "client.logout"`, () => {
        result()
        expect(logout.mock.calls).toEqual([[]])
      })
    })
  })
  {
    const cases = [
      [true, false],
      [false, true],
      [false, false],
    ]
    const msg = `makeLogoutFunction (ready %j, authenticated %j)`
    describe.each(cases)(msg, (ready, authenticated) => {
      it(`should return a function that runs`, () => {
        const result = makeLogoutFunction(ready, authenticated, {})
        expect(result).toBeInstanceOf(Function)
        result()
      })
    })
  }
})