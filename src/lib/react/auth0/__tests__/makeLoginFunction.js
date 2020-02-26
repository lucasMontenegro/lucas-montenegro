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
  jestUtils.describeDependencies({
    deps: [
      `./loginPopupId`,
      `lib/languageDetector`,
      `lib/utils/globals`,
      `@auth0/auth0-spa-js`,
      `react`,
      `bluebird`, // this test file
    ],
    relativeBasePath: __dirname,
  })
  describe(`makeLoginFunction (client is null)`, () => {
    const onLoginPopupTimeout = jest.fn()
    const setUser = jest.fn()
    let login
    beforeAll(() => {
      login = makeLoginFunction(null, onLoginPopupTimeout, setUser)
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
          onLoginPopupTimeout.mockClear()
        })
      }],
      [`is undefined`, undefined, () => {}],
    ]
    const msg = `makeLoginFunction (client is not null, "onLoginPopupTimeout" %s)`
    describe.each(cases)(msg, (x, onLoginPopupTimeout, testTimeout) => {
      const client = {}
      let login
      beforeAll(() => {
        login = makeLoginFunction(client, onLoginPopupTimeout, u => u)
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
      {
        const cases = [
          [`some other type of error`, Error(`foo`)],
          [`a non-object error`, `error`],
        ]
        describe.each(cases)(`login (popup throws %s)`, (x, error) => {
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
      }
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