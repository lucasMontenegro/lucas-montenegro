export default function describeUnknownClient ({ routing, exampleLocations, runMatchers }) {
  const cases = routing.languageCodes.map((languageCode, i) => [i, languageCode])
  const msg = `routing.matchers.unknownClient[%d]`
  describe.each(cases)(msg, (i, languageCode) => {
    const matcher = routing.matchers.unknownClient[i]
    it(`should have the right object shape`, () => {
      expect(matcher).toHaveProperty(`languageCode`, languageCode)
      expect(matcher.match).toBeInstanceOf(Function)
      expect(Object.keys(matcher)).toHaveLength(2)
    })
    {
      const cases = exampleLocations.unknownClient[languageCode].map((obj, i) => [i, obj])
      const msg = (
        `should not have colliding matchers `
        + `(exampleLocations.unknownClient.${languageCode}[%d])`
      )
      test.each(cases)(msg, (i, location) => {
        const captures = runMatchers(location)
        expect(captures.root).toBe(false)
        expect(captures.languageOnly).toHaveLength(0)
        expect(captures.client).toHaveLength(0)
        expect(captures.unknownClient).toHaveLength(1)
        expect(captures.unknownClient[0]).toBe(matcher)
      })
    }
  })
}