export default function describeNotFound ({ routing, exampleLocations }) {
  const { languageCodes, locations } = routing
  describe(`Not Found routing only`, () => {
    describe(`routing.locations.notFound`, () => {
      it(`should not have a "state" property`, () => {
        // location.state is used for storing a referrer location
        expect(routing.locations.notFound).not.toHaveProperty(`state`)
      })
    })
    {
      const cases = languageCodes.map(oldLanguage => [oldLanguage])
      const translator = routing.linkTranslators.notFound
      describe.each(cases)(`routing.linkTranslators.notFound.%s`, oldLanguage => {
        const cases = (cases => {
          const arr = exampleLocations.client.notFound[oldLanguage]
          arr.forEach((location, i) => languageCodes.forEach(newLanguage => {
            cases.push([i, newLanguage, location])
          }))
          return cases
        })([]).filter(arr => `state` in arr[2])
        const msg = (
          `should translate exampleLocations.client.notFound.${oldLanguage}[%d] `
          + `to %s maintaining the "state" property`
        )
        test.each(cases)(msg, (i, newLanguage, location) => {
          const intl = translator[oldLanguage].toIntl(location)
          const local = translator[newLanguage].toLocal(intl)
          expect(local).toHaveProperty(`state`)
          expect(local.state).toBe(location.state)
        })
      })
    }
  })
}