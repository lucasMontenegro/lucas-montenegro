import describeRoutes from "lib/routing/describer/routes"
import describeLinkTranslators from "lib/routing/describer/linkTranslators"
import describeLocations from "lib/routing/describer/locations"
import describeNotFound from "lib/routing/describer/notFound"
export default function describeRouting ({ routing, exampleLocations }) {
  it(`should have the right object shape`, () => {
    expect(routing.languageCodes).toBeInstanceOf(Array)
    expect(routing.languageNames).toBeInstanceOf(Object)
    expect(routing.clientNames).toBeInstanceOf(Array)
    expect(routing.locations).toBeInstanceOf(Object)
    expect(routing.linkTranslators).toBeInstanceOf(Object)
    expect(routing.routes).toBeInstanceOf(Object)
    expect(Object.keys(routing)).toHaveLength(6)
  })
  describe(`routing.languageCodes`, () => {
    const { languageCodes } = routing
    it(`should not have repeated codes`, () => {
      expect(languageCodes).toEqual(Object.keys(languageCodes.reduce((obj, code) => {
        obj[code] = null
        return obj
      }, {})))
    })
  })
  describe(`routing.languageNames`, () => {
    const cases = routing.languageCodes.map(languageCode => [languageCode])
    test.each(cases)(`should support the "%s" language code`, languageCode => {
      expect(routing.languageNames).toHaveProperty(languageCode)
      expect(typeof routing.languageNames[languageCode]).toBe(`string`)
    })
  })
  describe(`routing.clientNames`, () => {
    const { clientNames } = routing
    it(`should not have repeated names`, () => {
      expect(clientNames).toEqual(Object.keys(clientNames.reduce((obj, code) => {
        obj[code] = null
        return obj
      }, {})))
    })
  })
  function filterRoutes (location) {
    return [`languageOnly`, `client`, `clientNotFound`].reduce((captures, name) => {
      captures[name] = routing.routes[name].filter(route => route.match(location))
      return captures
    }, { matchRoot: routing.routes.matchRoot(location) })
  }
  describeRoutes({ routing, exampleLocations, filterRoutes })
  describeLinkTranslators({ routing, exampleLocations, filterRoutes })
  describeLocations({ routing, exampleLocations, filterRoutes })
  describeNotFound({ routing, exampleLocations })
}