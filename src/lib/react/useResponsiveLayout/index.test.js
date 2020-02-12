import useMediaQuery from "@material-ui/core/useMediaQuery"
import useResponsiveLayout from "./index.js"
jest.mock(`@material-ui/core/useMediaQuery`, () => ({ __esModule: true, default: jest.fn() }))
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`])).toMatchSnapshot()
  })
  const source = {
    desktop: () => `desktop view`,
    tablet: () => `tablet view`,
    mobile: () => `mobile view`,
  }
  const cases = [
    [true, true, `desktop view`],
    [true, false, `desktop view`],
    [false, true, `tablet view`],
    [false, false, `mobile view`],
  ]
  const msg = `const r = useResponsiveLayout() (is desktop %j, is tablet %j)`
  describe.each(cases)(msg, (isDesktop, isTablet, view) => {
    let r, desktopMediaQuery, tabletMediaQuery
    beforeAll(() => {
      useMediaQuery.mockReturnValueOnce(isDesktop)
      useMediaQuery.mockReturnValueOnce(isTablet)
      r = useResponsiveLayout()
      try {
        ([[desktopMediaQuery], [tabletMediaQuery]] = useMediaQuery.mock.calls)
        useMediaQuery.mockClear()
      } catch (e) {}
    })
    it(`should return a function`, () => {
      expect(r).toBeInstanceOf(Function)
    })
    it(`should set up a desktop media query`, () => {
      expect(desktopMediaQuery).toBeInstanceOf(Function)
    })
    it(`should set up a tablet media query`, () => {
      expect(tabletMediaQuery).toBeInstanceOf(Function)
    })
    describe(`r (device is not available)`, () => {
      it(`should return null`, () => {
        expect(r({})).toBeNull()
      })
    })
    describe(`r (device is available)`, () => {
      it(`should return the proper view`, () => {
        expect(r(source)).toEqual(view)
      })
    })
    {
      const theme = { breakpoints: { up: x => `theme.breakpoints.up(${JSON.stringify(x)})` } }
      describe(`desktop media query`, () => {
        it(`should run`, () => {
          expect(desktopMediaQuery(theme)).toEqual(`theme.breakpoints.up("md")`)
        })
      })
      describe(`tablet media query`, () => {
        it(`should run`, () => {
          expect(tabletMediaQuery(theme)).toEqual(`theme.breakpoints.up("sm")`)
        })
      })
    }
  })
})