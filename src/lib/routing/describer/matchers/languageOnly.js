export default function describeLanguageOnly ({ routing, exampleLocations, runMatchers }) {
  const expectedOrder = routing.languageCodes.map((languageCode, i) => [i, languageCode])
  const msg = `routing.matchers.languageOnly[%d]`
  describe.each(expectedOrder)(msg, (i, languageCode) => {
    const matcher = routing.matchers.languageOnly[i]
    it(`should have the right object shape`, () => {
      expect(matcher).toHaveProperty(`languageCode`, languageCode)
      expect(matcher.match).toBeInstanceOf(Function)
      expect(Object.keys(matcher)).toHaveLength(2)
    })
    {
      const cases = exampleLocations.languageOnly[languageCode].map((obj, i) => [i, obj])
      const msg = (
        `should not have colliding matchers `
        + `(exampleLocations.languageOnly.${languageCode}[%d])`
      )
      test.each(cases)(msg, (i, location) => {
        const captures = runMatchers(location)
        expect(captures.root).toBe(false)
        expect(captures.languageOnly).toHaveLength(1)
        expect(captures.languageOnly[0]).toBe(matcher)
        expect(captures.client).toHaveLength(0)
        expect(captures.unknownClient).toHaveLength(0)
      })
    }
  })
}