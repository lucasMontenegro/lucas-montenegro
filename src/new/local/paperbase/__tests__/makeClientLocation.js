import makeClientLocation from "new/local/paperbase/makeClientLocation"
describe(`new/local/paperbase/makeClientLocation`, () => {
  it(`should forward the location when specified`, () => {
    const location = { pathname: `/some/path` }
    const useClientLocation = makeClientLocation({ forwardLocation: true })
    expect(useClientLocation(null, null, location)).toBe(location)
  })
})