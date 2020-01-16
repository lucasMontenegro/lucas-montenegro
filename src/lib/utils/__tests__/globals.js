import globals from "lib/utils/globals"
describe(`lib/utils/globals`, () => {
  it(`should export the global object`, () => {
    expect(globals).toBe(global)
  })
})