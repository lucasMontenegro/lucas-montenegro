jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: {} }))
jest.mock(`react`, () => ({ __esModule: true, useState: jest.fn() }))
describe(`../useLogout`, () => {
  jestUtils.describeDependencies({
    deps: [
      `lib/utils/globals`,
      `react`,
    ],
    relativeBasePath: __dirname,
  })
  {
    const auth0 = { logout: jest.fn() }
    function itShouldOpenTheDialog(setIsOpen) {
      it(`should open the dialog`, () => {
        expect(setIsOpen.mock.calls).toEqual([[true]])
        setIsOpen.mockClear()
      })
      it(`should not log out`, () => {
        expect(auth0.logout.mock.calls).toEqual([])
      })
    }
    function itShouldLogOut (setIsOpen) {
      it(`should not open the dialog`, () => {
        expect(setIsOpen.mock.calls).toEqual([])
      })
      it(`should log out`, () => {
        expect(auth0.logout.mock.calls).toEqual([[]])
        auth0.logout.mockClear()
      })
    }
    const cases = [
      [`BYPASS_DIALOG`, true, {
        initialAuto: false,
        testOpen: itShouldLogOut,
        newAuto: false,
        newStorageValue: `BYPASS_DIALOG`,
      }],
      [`OPEN_DIALOG`, true, {
        initialAuto: false,
        testOpen: itShouldOpenTheDialog,
        newAuto: false,
        newStorageValue: `BYPASS_DIALOG`,
      }],
      [null, true, {
        initialAuto: true,
        testOpen: itShouldOpenTheDialog,
        newAuto: false,
        newStorageValue: `BYPASS_DIALOG`,
      }],
      [`BYPASS_DIALOG`, false, {
        initialAuto: false,
        testOpen: itShouldLogOut,
        newAuto: true,
        newStorageValue: `OPEN_DIALOG`,
      }],
      [`OPEN_DIALOG`, false, {
        initialAuto: false,
        testOpen: itShouldOpenTheDialog,
        newAuto: true,
        newStorageValue: `OPEN_DIALOG`,
      }],
      [null, false, {
        initialAuto: true,
        testOpen: itShouldOpenTheDialog,
        newAuto: true,
        newStorageValue: `OPEN_DIALOG`,
      }],
    ]
    const msg = `useLogout (storage value %j, auto %j)`
    describe.each(cases)(msg, (storageValue, auto, expected) => {
      const localStorage = { getItem: () => storageValue }
      let useState
      const setAuto = jest.fn()
      const setIsOpen = jest.fn()
      let logout
      beforeAll(() => {
        require("lib/utils/globals").default.window = { localStorage }
        ;({ useState } = require("react"))
        useState.mockReturnValueOnce([auto, setAuto])
        useState.mockReturnValueOnce([false, setIsOpen])
        logout = require("../useLogout").default(auth0)
      })
      afterAll(() => {
        jest.resetModules()
      })
      it(`should set up the logout state`, () => {
        expect(logout).toMatchSnapshot()
      })
      it(`should set up the initial value of logout.auto`, () => {
        expect(useState.mock.calls).toEqual([[expected.initialAuto], [false]])
        useState.mockClear()
      })
      describe(`logout.open`, () => {
        beforeAll(() => {
          logout.open()
        })
        expected.testOpen(setIsOpen)
      })
      describe(`logout.close`, () => {
        it(`should close the dialog`, () => {
          logout.close()
          expect(setIsOpen.mock.calls).toEqual([[false]])
          setIsOpen.mockClear()
        })
      })
      describe(`logout.handleAuto`, () => {
        it(`should update the checkbox state`, () => {
          logout.handleAuto()
          expect(setAuto.mock.calls).toEqual([[expected.newAuto]])
          setAuto.mockClear()
        })
      })
      describe(`logout.confirm`, () => {
        const setItem = jest.fn()
        beforeAll(() => {
          localStorage.setItem = setItem
          logout.confirm()
          delete localStorage.setItem
        })
        it(`should update the storage`, () => {
          expect(setItem.mock.calls).toEqual([[
            `lib-react-access_button-use_logout`,
            expected.newStorageValue,
          ]])
          setItem.mockClear()
        })
        it(`should logout`, () => {
          expect(auth0.logout.mock.calls).toEqual([[]])
          auth0.logout.mockClear()
        })
      })
    })
  }
})