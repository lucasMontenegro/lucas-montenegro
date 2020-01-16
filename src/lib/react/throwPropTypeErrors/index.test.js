jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: {} },
}))
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`prop-types`])).toMatchSnapshot()
  })
  describe(`require("./index.js") (production true)`, () => {
    let globals
    const error = {}
    beforeAll(() => {
      require("lib/utils/isProduction").default.mockReturnValueOnce(true)
      globals = require("lib/utils/globals").default
      globals.console.error = error
      require("./index.js")
    })
    afterAll(() => jest.resetModules())
    it(`should not modify console.error`, () => {
      expect(globals.console.error).toBe(error)
    })
  })
  describe(`require("./index.js") (production false)`, () => {
    let globals
    const apply = jest.fn()
    beforeAll(() => {
      require("lib/utils/isProduction").default.mockReturnValueOnce(false)
      globals = require("lib/utils/globals").default
      globals.console.error = { apply }
      require("./index.js")
    })
    afterAll(() => jest.resetModules())
    it(`should replace console.error with a new function`, () => {
      expect(globals.console.error).toBeInstanceOf(Function)
    })
    {
      const cases = [
        [`invalid prop-type`],
        [`invalid proptype`],
        [`failed prop-type`],
        [`failed proptype`],
      ]
      describe.each(cases)(`logErrorOrThrow (msg %j)`, msg => {
        it(`should throw an error`, () => {
          expect(() => globals.console.error(msg)).toThrow(msg)
        })
        it(`should not call the original console.error method`, () => {
          try {
            globals.console.error(msg)
          } catch (e) {}
          expect(apply.mock.calls).toEqual([])
        })
      })
    }
    {
      const cases = [
        [`invalid`],
        [`failed`],
        [`proptype`],
        [`prop-type`],
      ]
      describe.each(cases)(`logErrorOrThrow (msg %j)`, msg => {
        it(`should call the original console.error method`, () => {
          globals.console.error(msg)
          expect(apply.mock.calls).toHaveLength(1)
          expect(apply.mock.calls[0]).toHaveLength(2)
          expect(apply.mock.calls[0][0]).toBe(globals.console)
          expect(apply.mock.calls[0][1]).toHaveLength(1)
          expect(apply.mock.calls[0][1][0]).toBe(msg)
          apply.mockClear()
        })
      })
    }
  })
})