import globals from "new/local/utils/globals"
describe(`new/local/utils/globals`, () => {
  it(`should export the global object`, () => {
    expect(globals).toBe(global)
  })
})