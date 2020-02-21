import loginPopupId from "../loginPopupId"
import languageDetector from "lib/languageDetector"
import globals from "lib/utils/globals"
import makeLoginFunction from "../makeLoginFunction"
import Bluebird from "bluebird"
jest.mock(`../loginPopupId`, () => ({
  __esModule: true,
  default: { get: () => 17 },
}))
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { get: () => `en` },
}))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: {} },
}))
describe(`../makeLoginFunction`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@auth0/auth0-spa-js`])).toMatchSnapshot()
  })
  describe(`makeLoginFunction (ready false)`, () => {
    const onLoginPopupTimeout = jest.fn()
    const setUser = jest.fn()
    let login
    beforeAll(() => {
      login = makeLoginFunction(false, {}, onLoginPopupTimeout, setUser)
    })
    it(`should return a function`, () => {
      expect(login).toBeInstanceOf(Function)
    })
    describe(`login`, () => {
      it(`should not do anything`, () => {
        login()
        expect(onLoginPopupTimeout.mock.calls).toEqual([])
        expect(setUser.mock.calls).toEqual([])
      })
    })
  })
  {
    const cases = [
      [`is a function`, jest.fn(), onLoginPopupTimeout => {
        it(`should call "onLoginPopupTimeout"`, () => {
          expect(onLoginPopupTimeout.mock.calls).toEqual([[]])
        })
      }],
      [`is undefined`, undefined, () => {}],
    ]
    const msg = `makeLoginFunction (ready true, "onLoginPopupTimeout" %s)`
    describe.each(cases)(msg, (x, onLoginPopupTimeout, testTimeout) => {
      const client = {}
      let login
      beforeAll(() => {
        login = makeLoginFunction(true, client, onLoginPopupTimeout, u => u)
      })
      it(`should return a function`, () => {
        expect(login).toBeInstanceOf(Function)
      })
      describe(`login (popup throws a timeout error)`, () => {
        const warn = jest.fn()
        beforeAll(async () => {
          client.loginWithPopup = () => Bluebird.reject({ error: `timeout` })
          globals.console.warn = warn
          await login()
        })
        testTimeout(onLoginPopupTimeout)
        it(`should log a warning message`, () => {
          expect(warn.mock.calls).toEqual([[`An Auth0 login popup timed out.`]])
          warn.mockClear()
        })
      })
      describe(`login (popup throws a state error with non-unique popup ID)`, () => {
        const warn = jest.fn()
        beforeAll(async () => {
          client.loginWithPopup = () => Bluebird.reject(Error(`Invalid state`))
          loginPopupId.check = () => true
          globals.console.warn = warn
          await login()
        })
        it(`should log a warning message`, () => {
          expect(warn.mock.calls).toEqual([[
            `An Auth0 login popup threw an "Invalid state" error. Probably because the login`
            + ` button was clicked multiple times in a row.`
          ]])
          warn.mockClear()
        })
      })
      describe(`login (popup throws a state error with unique popup ID)`, () => {
        const error = Error(`Invalid state`)
        let thrown
        beforeAll(async () => {
          client.loginWithPopup = () => Bluebird.reject(error)
          loginPopupId.check = () => false
          delete globals.console.warn
          try {
            await login()
          } catch (e) {
            thrown = e
          }
        })
        it(`should re-throw the error`, () => {
          expect(thrown).toBe(error)
        })
      })
      describe(`login (popup throws a non-object error)`, () => {
        const error = `error`
        let thrown
        beforeAll(async () => {
          client.loginWithPopup = () => Bluebird.reject(error)
          delete loginPopupId.check
          try {
            await login()
          } catch (e) {
            thrown = e
          }
        })
        it(`should re-throw the error`, () => {
          expect(thrown).toBe(error)
        })
      })
      describe(`login (popup succeeds, authenticated true)`, () => {
        it(`should return the user object`, async () => {
          const user = {}
          client.loginWithPopup = () => Bluebird.resolve()
          client.isAuthenticated = () => Bluebird.resolve(true)
          client.getUser = () => Bluebird.resolve(user)
          expect(await login()).toBe(user)
        })
      })
      describe(`login (popup succeeds, authenticated false)`, () => {
        it(`should return null`, async () => {
          client.loginWithPopup = () => Bluebird.resolve()
          client.isAuthenticated = () => Bluebird.resolve(false)
          delete client.getUser
          expect(await login()).toBe(null)
        })
      })
    })
  }
})