import globals from "lib/utils/globals"
import isProduction from "lib/utils/isProduction"
import throwPropTypeErrors from "lib/throwPropTypeErrors"
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: {} },
}))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`lib/throwPropTypeErrors`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`prop-types`])).toMatchSnapshot()
  })
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