import createAuth0Client from "@auth0/auth0-spa-js"
import globals from "lib/utils/globals"
import history from "lib/browserHistory"
import Bluebird from "bluebird"
jest.mock(`@auth0/auth0-spa-js`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: {
    window: {
      location: {
        origin: `globals.window.location.origin`,
        search: {},
        pathname: `globals.window.location.pathname`,
      },
    },
  },
}))
const searchIncludes = {}
globals.window.location.search.includes = str => searchIncludes[str]
jest.mock(`lib/browserHistory`, () => ({
  __esModule: true,
  default: { push: jest.fn() },
}))
describe(`../initAuth0`, () => {
  let initAuth0
  beforeAll(() => {
    initAuth0 = require("../initAuth0").default
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@auth0/auth0-spa-js`])).toMatchSnapshot()
  })
  {
    function itShouldPushHistory (client) {
      it(`should call "client.handleRedirectCallback"`, () => {
        expect(client.handleRedirectCallback.mock.calls).toEqual([[]])
        client.handleRedirectCallback.mockClear()
      })
      it(`should push the current pathname to the browser history`, () => {
        expect(history.push.mock.calls).toEqual([[`globals.window.location.pathname`]])
        history.push.mockClear()
      })
    }
    function itShouldNotChangeHistory (client) {
      it(`should not call "client.handleRedirectCallback"`, () => {
        expect(client.handleRedirectCallback.mock.calls).toEqual([])
      })
      it(`should not update the browser history`, () => {
        expect(history.push.mock.calls).toEqual([])
      })
    }
    function itShouldReturnUser (user, getResult) {
      it(`should save the retrieved user`, () => {
        expect(getResult()).toBe(user)
      })
    }
    function itShouldReturnNull (user, getResult) {
      it(`should set the user to null`, () => {
        expect(getResult()).toBe(null)
      })
    }
    const cases = [
      [true, true, true, itShouldPushHistory, itShouldReturnUser],
      [true, true, false, itShouldPushHistory, itShouldReturnNull],
      [true, false, true, itShouldNotChangeHistory, itShouldReturnUser],
      [true, false, false, itShouldNotChangeHistory, itShouldReturnNull],
      [false, true, true, itShouldNotChangeHistory, itShouldReturnUser],
      [false, true, false, itShouldNotChangeHistory, itShouldReturnNull],
      [false, false, true, itShouldNotChangeHistory, itShouldReturnUser],
      [false, false, false, itShouldNotChangeHistory, itShouldReturnNull],
    ]
    const msg = (
      `initAuth0 ("code=" in search %j, "state=" in search %j, client is authenticated %j)`
    )
    describe.each(cases)(msg, (
      (codeInSearch, stateInSearch, authenticated, testHistory, testUser) => {
        const user = {}
        const client = {
          handleRedirectCallback: jest.fn(() => Bluebird.resolve()),
          isAuthenticated: () => Bluebird.resolve(authenticated),
          getUser: () => Bluebird.resolve(user),
        }
        let result
        beforeAll(async () => {
          process.env.REACT_APP_AUTH0_DOMAIN = `process.env.REACT_APP_AUTH0_DOMAIN`
          process.env.REACT_APP_AUTH0_CLIENT_ID = `process.env.REACT_APP_AUTH0_CLIENT_ID`
          createAuth0Client.mockReturnValueOnce(Bluebird.resolve(client))
          searchIncludes[`code=`] = codeInSearch
          searchIncludes[`state=`] = stateInSearch
          result = await initAuth0(str => `redirectUri(${str})`, () => {}, x => x)
        })
        testHistory(client)
        testUser(user, () => result)
      }
    ))
  }
})