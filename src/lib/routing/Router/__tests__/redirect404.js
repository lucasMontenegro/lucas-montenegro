import languageDetector from "lib/languageDetector"
import redirect404 from "lib/routing/Router/redirect404"
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/Router/redirect404`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react-router-dom`])).toMatchSnapshot()
  })
  it(`should return a route that redirects to notFound`, () => {
    const router = {
      redirect404,
      renderEmpty: {},
      locations: {
        notFound: { foo: { pathname: `foo` } },
      },
    }
    languageDetector.get = () => `foo`
    const location = {}
    const result = router.redirect404(location)
    expect(result).toEqual({
      render: {},
      languageCode: `foo`,
      redirect: { pathname: `foo`, state: {} },
    })
    expect(result.render).toBe(router.renderEmpty)
    expect(result.redirect.state).toBe(location)
  })
})