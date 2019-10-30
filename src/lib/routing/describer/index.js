import describeMatchers from "lib/routing/describer/matchers"
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
    expect(routing.matchers).toBeInstanceOf(Object)
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
  function runMatchers (location) {
    return [`languageOnly`, `client`, `unknownClient`].reduce((captures, name) => {
      captures[name] = routing.matchers[name].filter(matcher => matcher.match(location))
      return captures
    }, { root: routing.matchers.root(location) })
  }
  describeMatchers({ routing, exampleLocations, runMatchers })
  describeLinkTranslators({ routing, exampleLocations, runMatchers })
  describeLocations({ routing, exampleLocations, runMatchers })
  describeNotFound({ routing, exampleLocations })
}