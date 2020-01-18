import globals from "lib/utils/globals"
import embedForm from "../embedForm"
jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: {} }))
describe(`../embedForm`, () => {
  describe(`embedForm (no error thrown)`, () => {
    it(`should run`, () => {
      globals.window = {
        WufooForm: class WufooForm {
          constructor () {}
          initialize () {}
          display () {}
        }
      }
      embedForm(`hash`, `512`)
    })
  })
  const cases = [
    [
      `constructor`,
      class WufooForm {
        constructor () {
          throw Error(`fake error`)
        }
        initialize () {}
        display () {}
      },
    ],
    [
      `initialize`,
      class WufooForm {
        constructor () {}
        initialize () {
          throw Error(`fake error`)
        }
        display () {}
      },
    ],
    [
      `display`,
      class WufooForm {
        constructor () {}
        initialize () {}
        display () {
          throw Error(`fake error`)
        }
      },
    ],
  ]
  describe.each(cases)(`embedForm (WufooForm %s error)`, (str, WufooForm) => {
    it(`should throw`, () => {
      globals.window = { WufooForm }
      expect(() => embedForm(`hash`, `512`)).toThrow(`fake error`)
    })
  })
})