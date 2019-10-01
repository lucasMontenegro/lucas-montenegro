const mockEnv = require("local/helpers/mockEnv")
describe(`local/helpers/mockEnv`, () => {
  it(`should change env variables`, () => {
    process.env.FOO = `foo`
    let mockedFoo
    mockEnv(`FOO`, `bar`, () => {
      mockedFoo = process.env.FOO
    })
    expect(mockedFoo).toBe(`bar`)
    expect(process.env.FOO).toBe(`foo`)
    delete process.env.FOO
  })
  it(`should handle undefined env variables`, () => {
    let mockedFoo
    mockEnv(`FOO`, `bar`, () => {
      mockedFoo = process.env.FOO
    })
    expect(mockedFoo).toBe(`bar`)
    expect(process.env).not.toHaveProperty(`FOO`)
  })
  it(`should return the callback result`, () => {
    process.env.FOO = `foo`
    expect(mockEnv(`FOO`, `bar`, () => process.env.FOO)).toBe(`bar`)
    delete process.env.FOO
  })
})