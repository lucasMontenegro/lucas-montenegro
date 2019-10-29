export default function describeClient ({ routing, exampleLocations, filterRoutes }) {
  const cases = (arr => {
    routing.clientNames.forEach(clientName => routing.languageCodes.forEach(languageCode => {
      arr.push([languageCode, clientName])
    }))
    return arr.map((values, i) => [i, ...values])
  })([])
  const msg = `routing.routes.client[%d]`
  describe.each(cases)(msg, (i, languageCode, clientName) => {
    const route = routing.routes.client[i]
    it(`should have the right object shape`, () => {
      expect(route).toHaveProperty(`clientName`, clientName)
      expect(route).toHaveProperty(`languageCode`, languageCode)
      expect(route.match).toBeInstanceOf(Function)
      expect(Object.keys(route)).toHaveLength(3)
    })
    {
      const cases = exampleLocations.client[clientName][languageCode].map((obj, i) => [i, obj])
      const msg = (
        `should not have colliding routes `
        + `exampleLocations.client.${clientName}.${languageCode}[%d]`
      )
      test.each(cases)(msg, (i, location) => {
        const captures = filterRoutes(location)
        expect(captures.matchRoot).toBe(false)
        expect(captures.languageOnly).toHaveLength(0)
        expect(captures.client).toHaveLength(1)
        expect(captures.client[0]).toBe(route)
        expect(captures.clientNotFound).toHaveLength(1)
        expect(captures.clientNotFound[0]).toHaveProperty(`languageCode`, languageCode)
      })
    }
  })
}