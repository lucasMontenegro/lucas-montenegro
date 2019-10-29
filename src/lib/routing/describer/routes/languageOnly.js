export default function describeLanguageOnly ({ routing, exampleLocations, filterRoutes }) {
  const expectedOrder = routing.languageCodes.map((languageCode, i) => [i, languageCode])
  const msg = `routing.routes.languageOnly[%d]`
  describe.each(expectedOrder)(msg, (i, languageCode) => {
    const route = routing.routes.languageOnly[i]
    it(`should have the right object shape`, () => {
      expect(route).toHaveProperty(`languageCode`, languageCode)
      expect(route.match).toBeInstanceOf(Function)
      expect(Object.keys(route)).toHaveLength(2)
    })
    {
      const cases = exampleLocations.languageOnly[languageCode].map((obj, i) => [i, obj])
      const msg = (
        `should not have colliding routes `
        + `(exampleLocations.languageOnly.${languageCode}[%d])`
      )
      test.each(cases)(msg, (i, location) => {
        const captures = filterRoutes(location)
        expect(captures.matchRoot).toBe(false)
        expect(captures.languageOnly).toHaveLength(1)
        expect(captures.languageOnly[0]).toBe(route)
        expect(captures.client).toHaveLength(0)
        expect(captures.clientNotFound).toHaveLength(0)
      })
    }
  })
}