jest.mock(`global`, () => ({
  __esModule: true,
  default: { console: {}, process: { env: {} } },
}))
import global from "global"
jest.mock(`new/lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
import isProduction from "new/lib/utils/isProduction"
import throwPropTypeErrors from "new/app/ui/throwPropTypeErrors"
describe(`new/app/ui/throwPropTypeErrors`, () => {
  afterEach(() => {
    delete global.console.error
    delete global.console.msg
  })
  it(`should not mutate "console.error" in "production"`, () => {
    const error = global.console.error = {}
    isProduction.mockReturnValueOnce(true)
    throwPropTypeErrors()
    expect(global.console.error).toBe(error)
  })
  it(`should replace "console.error" when not in "production"`, () => {
    const error = global.console.error = {}
    isProduction.mockReturnValueOnce(false)
    throwPropTypeErrors()
    expect(global.console.error).not.toBe(error)
    expect(global.console.error).toBeInstanceOf(Function)
    expect(global.console.error).toHaveProperty(`name`, `logErrorOrThrow`)
  })
  test.each([
    [`invalid prop`],
    [`invalid type`],
    [`failed prop`],
    [`failed type`],
    [`proptype`],
  ])(`should log errors unrelated to prop-types [console.error("%s")]`, msg => {
    const apply = jest.fn()
    global.console.error = { apply }
    isProduction.mockReturnValueOnce(false)
    throwPropTypeErrors()
    global.console.error(msg)
    expect(apply.mock.calls).toHaveLength(1)
    expect(apply.mock.calls[0]).toHaveLength(2)
    expect(apply.mock.calls[0][0]).toBe(global.console)
    expect(apply.mock.calls[0][1]).toHaveLength(1)
    expect(apply.mock.calls[0][1][0]).toBe(msg)
  })
  test.each([
    [`invalid prop-type`],
    [`failed prop type`],
  ])(`should throw prop-type errors [console.error("%s")]`, msg => {
    isProduction.mockReturnValueOnce(false)
    throwPropTypeErrors()
    expect(() => global.console.error(msg)).toThrow(msg)
  })
})