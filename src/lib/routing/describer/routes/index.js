import describeLanguageOnly from "lib/routing/describer/routes/languageOnly"
import describeClient from "lib/routing/describer/routes/client"
import describeClientNotFound from "lib/routing/describer/routes/clientNotFound"
export default function describeRoutes ({ routing, exampleLocations, filterRoutes }) {
  const { routes } = routing
  describe(`routing.routes`, () => {
    it(`should have the right object shape`, () => {
      expect(routes.matchRoot).toBeInstanceOf(Function)
      expect(routes.languageOnly).toBeInstanceOf(Array)
      expect(routes.client).toBeInstanceOf(Array)
      expect(routes.clientNotFound).toBeInstanceOf(Array)
      expect(Object.keys(routes)).toHaveLength(4)
    })
    describe(`routing.routes.matchRoot`, () => {
      it(`should not collide with other routes`, () => {
        exampleLocations.matchRoot.forEach(location => {
          const captures = filterRoutes(location)
          expect(captures.matchRoot).toBe(true)
          expect(captures.languageOnly).toHaveLength(0)
          expect(captures.client).toHaveLength(0)
          expect(captures.clientNotFound).toHaveLength(0)
        })
      })
    })
    describeLanguageOnly({ routing, exampleLocations, filterRoutes })
    describeClient({ routing, exampleLocations, filterRoutes })
    describeClientNotFound({ routing, exampleLocations, filterRoutes })
  })
}