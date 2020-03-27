import globals from "lib/utils/globals"
import requiredEnv from "../requiredEnv"
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { process: {} },
}))
describe(`../requiredEnv`, () => {
  jestUtils.describeDependencies({
    deps: [`lib/utils/globals`],
    relativeBasePath: __dirname,
  })
  describe(`requiredEnv (variable is defined)`, () => {
    it(`should return the environment value`, () => {
      globals.process.env = { FOO: `foo` }
      expect(requiredEnv(`FOO`)).toBe(`foo`)
    })
  })
  describe(`requiredEnv (variable is not defined)`, () => {
    it(`should throw`, () => {
      globals.process.env = {}
      expect(() => requiredEnv(`FOO`)).toThrow(`process.env.FOO is required`)
    })
  })
})