export default function describeClientNotFound ({ routing, exampleLocations, filterRoutes }) {
  const cases = routing.languageCodes.map((languageCode, i) => [i, languageCode])
  const msg = `routing.routes.clientNotFound[%d]`
  describe.each(cases)(msg, (i, languageCode) => {
    const route = routing.routes.clientNotFound[i]
    it(`should have the right object shape`, () => {
      expect(route).toHaveProperty(`languageCode`, languageCode)
      expect(route.match).toBeInstanceOf(Function)
      expect(Object.keys(route)).toHaveLength(2)
    })
    {
      const cases = exampleLocations.clientNotFound[languageCode].map((obj, i) => [i, obj])
      const msg = (
        `should not have colliding routes `
        + `(exampleLocations.clientNotFound.${languageCode}[%d])`
      )
      test.each(cases)(msg, (i, location) => {
        const captures = filterRoutes(location)
        expect(captures.matchRoot).toBe(false)
        expect(captures.languageOnly).toHaveLength(0)
        expect(captures.client).toHaveLength(0)
        expect(captures.clientNotFound).toHaveLength(1)
        expect(captures.clientNotFound[0]).toBe(route)
      })
    }
  })
}