import { useAuth0 } from "lib/react/auth0"
import useLogout from "../useLogout"
import useAccessButtonState from "../useAccessButtonState"
jest.mock(`lib/react/auth0`, () => ({ __esModule: true, useAuth0: jest.fn() }))
jest.mock(`../useLogout`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../useAccessButtonState`, () => {
  jestUtils.describeDependencies({
    deps: [
      `lib/react/auth0`,
      `../useLogout`,
    ],
    relativeBasePath: __dirname,
  })
  {
    function isShouldCloseDashboard (closeDashboard) {
      it(`should call "closeDashboard"`, () => {
        expect(closeDashboard.mock.calls).toEqual([[]])
        closeDashboard.mockClear()
      })
    }
    const cases = [
      [{}, `undefined`, undefined, () => {}],
      [null, `undefined`, undefined, () => {}],
      [{}, `a function`, jest.fn(), isShouldCloseDashboard],
      [null, `a function`, jest.fn(), isShouldCloseDashboard],
    ]
    const msg = `useAccessButtonState (auth0.user %j, closeDashboard is %s)`
    describe.each(cases)(msg, (auth0User, x, closeDashboard, testCloseDashboard) => {
      const auth0 = { user: auth0User, login: jest.fn() }
      const logout = {}
      let state
      beforeAll(() => {
        useAuth0.mockReturnValueOnce(auth0)
        useLogout.mockReturnValueOnce(logout)
        state = useAccessButtonState(closeDashboard)
      })
      it(`should set up the state`, () => {
        expect(state).toMatchSnapshot()
        expect(state.logout).toEqual(logout)
      })
      describe(`state.login`, () => {
        beforeAll(() => state.login())
        it(`should run auth0.login`, () => {
          expect(auth0.login.mock.calls).toEqual([[]])
          auth0.login.mockClear()
        })
        testCloseDashboard(closeDashboard)
      })
    })
  }
})