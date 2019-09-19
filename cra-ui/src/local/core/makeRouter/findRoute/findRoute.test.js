import findRoute from "./index"
import routing from "./routingExample"
const setDetectedLanguage = jest.fn()
describe(`local/core/makeRouter/findRoute`, () => {
  it(`should match the client routes`, () => {
    ;[
      {
        location: { pathname: `/en/home` },
        languageCode: `en`,
        clientName: `home`,
      },
      {
        location: { pathname: `/es/home` },
        languageCode: `es`,
        clientName: `home`,
      },
      {
        location: { pathname: `/en/example/324` },
        languageCode: `en`,
        clientName: `example`,
      },
      {
        location: { pathname: `/es/example/324` },
        languageCode: `es`,
        clientName: `example`,
      },
      {
        location: { pathname: `/en/notFound` },
        languageCode: `en`,
        clientName: `notFound`,
      },
      {
        location: { pathname: `/es/notFound` },
        languageCode: `es`,
        clientName: `notFound`,
      },
    ].forEach(({ location, languageCode, clientName }) =>  {
      expect(findRoute(routing, location, `foo`, setDetectedLanguage)).toEqual({
        type: `client`,
        languageCode,
        clientName,
        location,
      })
    })
    expect(setDetectedLanguage.mock.calls)
      .toEqual([[`en`], [`es`], [`en`], [`es`], [`en`], [`es`]])
    setDetectedLanguage.mockClear()
  })
  it(`should redirect without language detection`, () => {
    ;[
      {
        languageCode: `en`,
        location: { pathname: `/en` },
        redirectTo: { pathname: `/en/home` },
      },
      {
        languageCode: `en`,
        location: { pathname: `/en/404` },
        redirectTo: { pathname: `/en/notFound`, state: { pathname: `/en/404` } },
      },
      {
        languageCode: `es`,
        location: { pathname: `/es` },
        redirectTo: { pathname: `/es/home` },
      },
      {
        languageCode: `es`,
        location: { pathname: `/es/404` },
        redirectTo: { pathname: `/es/notFound`, state: { pathname: `/es/404` } },
      },
    ].forEach(({ languageCode, location, redirectTo }) => {
      expect(findRoute(routing, location, `foo`, setDetectedLanguage)).toEqual({
        type: `redirect`,
        languageCode,
        location: redirectTo,
      })
    })
    expect(setDetectedLanguage.mock.calls).toEqual([[`en`], [`en`], [`es`], [`es`]])
    setDetectedLanguage.mockClear()
  })
  it(`should detect the proper language and redirect`, () => {
    ;[
      {
        detectedLanguage: `en`,
        location: { pathname: `` },
        redirectTo: { pathname: `/en/home` },
      },
      {
        detectedLanguage: `en`,
        location: { pathname: `/404` },
        redirectTo: { pathname: `/en/notFound`, state: { pathname: `/404` } },
      },
      {
        detectedLanguage: `es`,
        location: { pathname: `` },
        redirectTo: { pathname: `/es/home` },
      },
      {
        detectedLanguage: `es`,
        location: { pathname: `/404` },
        redirectTo: { pathname: `/es/notFound`, state: { pathname: `/404` } },
      },
    ].forEach(({ detectedLanguage, location, redirectTo }) => {
      expect(findRoute(routing, location, detectedLanguage, setDetectedLanguage)).toEqual({
        type: `redirect`,
        languageCode: detectedLanguage,
        location: redirectTo,
      })
    })
    expect(setDetectedLanguage.mock.calls.length).toBe(0)
  })
})