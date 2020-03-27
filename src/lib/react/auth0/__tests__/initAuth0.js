import createAuth0Client from "@auth0/auth0-spa-js"
import createUser from "../createUser"
import Bluebird from "bluebird"
import initAuth0 from "../initAuth0"
jest.mock(`@auth0/auth0-spa-js`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`../createUser`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../initAuth0`, () => {
  jestUtils.describeDependencies({
    deps: [
      `@auth0/auth0-spa-js`,
      `lib/utils/requiredWebpackEnv`,
      `../createUser`,
      `react-scripts`, // process.env.FOO is replaced at compile time
      `react`,
      `bluebird`, // this test file
    ],
    relativeBasePath: __dirname,
  })
  describe(`initAuth0`, () => {
    const user = {}
    const client = {}
    const setClient = jest.fn()
    let result
    beforeAll(async () => {
      process.env.REACT_APP_AUTH0_DOMAIN = `process.env.REACT_APP_AUTH0_DOMAIN`
      process.env.REACT_APP_AUTH0_CLIENT_ID = `process.env.REACT_APP_AUTH0_CLIENT_ID`
      createAuth0Client.mockReturnValueOnce(Bluebird.resolve(client))
      createUser.mockReturnValueOnce(Bluebird.resolve(user))
      result = await initAuth0(setClient, x => x)
    })
    it(`should set the client`, () => {
      expect(setClient.mock.calls).toEqual([[{}]])
      expect(setClient.mock.calls[0][0]).toBe(client)
      setClient.mockClear()
    })
    it(`should set the user`, () => {
      expect(result).toEqual(user)
    })
  })
})