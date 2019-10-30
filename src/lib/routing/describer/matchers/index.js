import describeLanguageOnly from "lib/routing/describer/matchers/languageOnly"
import describeClient from "lib/routing/describer/matchers/client"
import describeUnknownClient from "lib/routing/describer/matchers/unknownClient"
export default function describeMatchers ({ routing, exampleLocations, runMatchers }) {
  const { matchers } = routing
  describe(`routing.matchers`, () => {
    it(`should have the right object shape`, () => {
      expect(matchers.root).toBeInstanceOf(Function)
      expect(matchers.languageOnly).toBeInstanceOf(Array)
      expect(matchers.client).toBeInstanceOf(Array)
      expect(matchers.unknownClient).toBeInstanceOf(Array)
      expect(Object.keys(matchers)).toHaveLength(4)
    })
    describe(`routing.matchers.root`, () => {
      it(`should not collide with other matchers`, () => {
        exampleLocations.root.forEach(location => {
          const captures = runMatchers(location)
          expect(captures.root).toBe(true)
          expect(captures.languageOnly).toHaveLength(0)
          expect(captures.client).toHaveLength(0)
          expect(captures.unknownClient).toHaveLength(0)
        })
      })
    })
    describeLanguageOnly({ routing, exampleLocations, runMatchers })
    describeClient({ routing, exampleLocations, runMatchers })
    describeUnknownClient({ routing, exampleLocations, runMatchers })
  })
}