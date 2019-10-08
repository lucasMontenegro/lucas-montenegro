jest.mock(`new/local/utils/globals`, () => ({
  default: {
    console: {},
    process: { env: {} },
  },
}))
const { default: globals } = require("new/local/utils/globals")
jest.mock(`new/local/utils/isProduction`, () => ({ default: jest.fn() }))
const { default: isProduction } = require("new/local/utils/isProduction")
const { default: throwPropTypeErrors } = require("new/local/app/ui/throwPropTypeErrors")
describe(`new/local/app/ui/throwPropTypeErrors`, () => {
  afterEach(() => {
    delete globals.console.error
    delete globals.console.msg
  })
  it(`should not mutate "console.error" in "production"`, () => {
    const error = globals.console.error = {}
    isProduction.mockReturnValueOnce(true)
    throwPropTypeErrors()
    expect(globals.console.error).toBe(error)
  })
  it(`should replace "console.error" when not in "production"`, () => {
    const error = globals.console.error = {}
    isProduction.mockReturnValueOnce(false)
    throwPropTypeErrors()
    expect(globals.console.error).not.toBe(error)
    expect(globals.console.error).toBeInstanceOf(Function)
    expect(globals.console.error).toHaveProperty(`name`, `logErrorOrThrow`)
  })
  test.each([
    [`invalid prop`],
    [`invalid type`],
    [`failed prop`],
    [`failed type`],
    [`proptype`],
  ])(`should log errors unrelated to prop-types [console.error("%s")]`, msg => {
    const apply = jest.fn()
    globals.console.error = { apply }
    isProduction.mockReturnValueOnce(false)
    throwPropTypeErrors()
    globals.console.error(msg)
    expect(apply.mock.calls).toHaveLength(1)
    expect(apply.mock.calls[0]).toHaveLength(2)
    expect(apply.mock.calls[0][0]).toBe(globals.console)
    expect(apply.mock.calls[0][1]).toHaveLength(1)
    expect(apply.mock.calls[0][1][0]).toBe(msg)
  })
  test.each([
    [`invalid prop-type`],
    [`failed prop type`],
  ])(`should throw prop-type errors [console.error("%s")]`, msg => {
    isProduction.mockReturnValueOnce(false)
    throwPropTypeErrors()
    expect(() => globals.console.error(msg)).toThrow(msg)
  })
})