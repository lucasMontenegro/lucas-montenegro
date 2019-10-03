const mockGlobals = require("local/utils/mockGlobals")
describe(`local/utils/mockGlobals`, () => {
  it(`should replace global values`, () => {
    global.foo = `oldFoo`
    global.bar = `oldBar`
    const foo = {}
    const bar = {}
    expect(mockGlobals({ foo, bar })).toEqual({ foo: `oldFoo`, bar: `oldBar` })
    expect(global).toHaveProperty(`foo`, foo)
    expect(global).toHaveProperty(`bar`, bar)
    delete global.foo
    delete global.bar
  })
})