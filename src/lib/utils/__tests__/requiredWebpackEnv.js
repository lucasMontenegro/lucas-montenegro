import requiredEnv from "../requiredWebpackEnv"
describe(`../requiredEnv`, () => {
  jestUtils.describeDependencies({
    // usage: requiredWebpackEnv(process.env.FOO)
    // 'process.env.FOO' is replaced at compile-time
    deps: [`react-scripts`],
    relativeBasePath: __dirname,
  })
  describe(`requiredWebpackEnv (value is a string)`, () => {
    it(`should return the value`, () => {
      expect(requiredEnv(`foo`)).toBe(`foo`)
    })
  })
  describe(`requiredWebpackEnv (variable is undefined)`, () => {
    it(`should throw`, () => {
      expect(() => requiredEnv(undefined)).toThrow(`An environment variable is required`)
    })
  })
})