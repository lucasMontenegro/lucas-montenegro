import makeClientLocation from "local/core/makeClientLocation"
describe(`local/core/makeClientLocation`, () => {
  it(`should forward the location when specified`, () => {
    const location = { pathname: `/some/path` }
    const useClientLocation = makeClientLocation({ forwardLocation: true })
    expect(useClientLocation(null, null, location)).toBe(location)
  })
})