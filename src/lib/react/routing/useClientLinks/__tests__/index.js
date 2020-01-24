import useBaseLinks from "../useBaseLinks"
import useClientLocations from "../useClientLocations"
import useClientLinks from "../index.js"
jest.mock(`../useBaseLinks`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`../useClientLocations`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`react`, () => ({ __esModule: true, useMemo: f => f() }))
describe(`../index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`useClientLinks (client locations object is null)`, () => {
    it(`should return an empty array`, () => {
      useBaseLinks.mockReturnValueOnce([
        { clientName: `foo`, render: `Foo` },
        { clientName: `bar`, render: `Bar` },
        { clientName: `baz`, render: `Baz` },
      ])
      useClientLocations.mockReturnValueOnce(null)
      expect(useClientLinks({}, {}, {})).toEqual([])
    })
  })
  describe(`useClientLinks (client locations object is not null)`, () => {
    it(`should create the client links`, () => {
      useBaseLinks.mockReturnValueOnce([
        { clientName: `foo`, render: `Foo` },
        { clientName: `bar`, render: `Bar` },
        { clientName: `baz`, render: `Baz` },
      ])
      useClientLocations.mockReturnValueOnce({
        foo: { pathname: `/foo` },
        bar: { pathname: `/bar` },
        baz: { pathname: `/baz` },
      })
      expect(useClientLinks({}, {}, { clientName: `foo` })).toEqual([
        { clientName: `foo`, active: true, render: `Foo`, location: { pathname: `/foo` } },
        { clientName: `bar`, active: false, render: `Bar`, location: { pathname: `/bar` } },
        { clientName: `baz`, active: false, render: `Baz`, location: { pathname: `/baz` } },
      ])
    })
  })
})