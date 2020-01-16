export default function describeClient ({ routing, exampleLocations, runMatchers }) {
  const cases = (arr => {
    routing.clientNames.forEach(clientName => routing.languageCodes.forEach(languageCode => {
      arr.push([languageCode, clientName])
    }))
    return arr.map((values, i) => [i, ...values])
  })([])
  const msg = `routing.matchers.client[%d]`
  describe.each(cases)(msg, (i, languageCode, clientName) => {
    const matcher = routing.matchers.client[i]
    it(`should have the right object shape`, () => {
      expect(matcher).toHaveProperty(`clientName`, clientName)
      expect(matcher).toHaveProperty(`languageCode`, languageCode)
      expect(matcher.match).toBeInstanceOf(Function)
      expect(Object.keys(matcher)).toHaveLength(3)
    })
    {
      const cases = exampleLocations.client[clientName][languageCode].map((obj, i) => [i, obj])
      const msg = (
        `should not have colliding matchers `
        + `exampleLocations.client.${clientName}.${languageCode}[%d]`
      )
      test.each(cases)(msg, (i, location) => {
        const captures = runMatchers(location)
        expect(captures.root).toBe(false)
        expect(captures.languageOnly).toHaveLength(0)
        expect(captures.client).toHaveLength(1)
        expect(captures.client[0]).toBe(matcher)
        expect(captures.unknownClient).toHaveLength(1)
        expect(captures.unknownClient[0]).toHaveProperty(`languageCode`, languageCode)
      })
    }
  })
}