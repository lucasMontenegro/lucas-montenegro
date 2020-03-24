import Bluebird from "bluebird"
import createUser from "../createUser"
jest.mock(`@auth0/auth0-spa-js`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../createUser`, () => {
  jestUtils.describeDependencies({
    deps: [
      `@auth0/auth0-spa-js`,
      `bluebird`,
    ],
    relativeBasePath: __dirname,
  })
  describe(`createUser (authenticated true)`, () => {
    it(`should return the user`, async () => {
      const user = {}
      const client = {
        isAuthenticated: () => Bluebird.resolve(true),
        getUser: () => Bluebird.resolve(user),
      }
      expect(await createUser(client)).toBe(user)
    })
  })
  describe(`createUser (authenticated false)`, () => {
    it(`should return the null`, async () => {
      const client = { isAuthenticated: () => Bluebird.resolve(false) }
      expect(await createUser(client)).toBe(null)
    })
  })
})