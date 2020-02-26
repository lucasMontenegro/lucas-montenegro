import createAuth0Client from "@auth0/auth0-spa-js"
import Bluebird from "bluebird"
import initAuth0 from "../initAuth0"
jest.mock(`@auth0/auth0-spa-js`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../initAuth0`, () => {
  jestUtils.describeDependencies({
    deps: [
      `@auth0/auth0-spa-js`,
      `react-scripts`, // process.env.FOO is replaced at compile time
      `react`,
      `bluebird`, // this test file
    ],
    relativeBasePath: __dirname,
  })
  {
    const cases = [
      [true, (user, getResult) => {
        it(`should save the retrieved user`, () => {
          expect(getResult()).toBe(user)
        })
      }],
      [false, (user, getResult) => {
        it(`should set the user to null`, () => {
          expect(getResult()).toBe(null)
        })
      }],
    ]
    describe.each(cases)(`initAuth0 (authenticated %j)`, (authenticated, testUser) => {
      const user = {}
      const client = {
        isAuthenticated: () => Bluebird.resolve(authenticated),
        getUser: () => Bluebird.resolve(user),
      }
      const setClient = jest.fn()
      let result
      beforeAll(async () => {
        process.env.REACT_APP_AUTH0_DOMAIN = `process.env.REACT_APP_AUTH0_DOMAIN`
        process.env.REACT_APP_AUTH0_CLIENT_ID = `process.env.REACT_APP_AUTH0_CLIENT_ID`
        createAuth0Client.mockReturnValueOnce(Bluebird.resolve(client))
        result = await initAuth0(setClient, x => x)
      })
      it(`should set the client`, () => {
        expect(setClient.mock.calls).toHaveLength(1)
        expect(setClient.mock.calls[0]).toHaveLength(1)
        expect(setClient.mock.calls[0][0]).toBe(client)
        setClient.mockClear()
      })
      testUser(user, () => result)
    })
  }
})