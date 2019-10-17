export default function describeRouting (opts) {
  const { routing, languageCodes, exampleLocations } = opts
  describe(`Not Found routing only`, () => {
    describe(`initial locations`, () => {
      it(`should not have a "state" property`, () => {
        // location.state is used for storing a referrer location
        Object.values(routing.locations.notFound).forEach(location => {
          expect(location).not.toHaveProperty(`state`)
        })
      })
    })
    describe(`link translators`, () => {
      it(`should translate maintaining the "state" property`, () => {
        const translator = routing.linkTranslators.notFound
        languageCodes.forEach(oldLanguage => exampleLocations[oldLanguage].forEach(location => {
          const intl = translator[oldLanguage].toIntl(location)
          languageCodes.forEach(newLanguage => {
            const local = translator[newLanguage].toLocal(intl)
            expect(local).toHaveProperty(`state`)
            expect(local.state).toBe(location.state)
          })
        }))
      })
    })
  })
}