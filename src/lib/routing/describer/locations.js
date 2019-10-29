export default function describeLocations ({ routing, exampleLocations, filterRoutes }) {
  const { languageCodes, clientNames, locations } = routing
  describe(`routing.locations`, () => {
    it(`should have the right object shape`, () => {
      expect(Object.keys(locations)).toEqual(clientNames)
    })
    {
      const cases = clientNames.map(clientName => [clientName])
      describe.each(cases)(`routing.locations.%s`, clientName => {
        const byLanguage = locations[clientName]
        it(`should have the right object shape`, () => {
          expect(byLanguage).toBeInstanceOf(Object)
          expect(Object.keys(byLanguage)).toEqual(languageCodes)
        })
        {
          const cases = languageCodes.map(oldLanguage => [oldLanguage])
          describe.each(cases)(`routing.locations.${clientName}.%s`, oldLanguage => {
            const location = byLanguage[oldLanguage]
            it(`should have the right object shape`, () => {
              expect(location).toBeInstanceOf(Object)
            })
            it(`should match its corresponding routes`, () => {
              const captures = filterRoutes(location)
              expect(captures.matchRoot).toBe(false)
              expect(captures.languageOnly).toHaveLength(0)
              expect(captures.client).toHaveLength(1)
              expect(captures.client[0]).toHaveProperty(`languageCode`, oldLanguage)
              expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
              expect(captures.clientNotFound).toHaveLength(1)
              expect(captures.clientNotFound[0]).toHaveProperty(`languageCode`, oldLanguage)
            })
            {
              const cases = languageCodes.map(newLanguage => [newLanguage])
              const msg = `should translate routing.locations.${clientName}.${oldLanguage} to %s`
              const translator = routing.linkTranslators[clientName]
              const intl = translator[oldLanguage].toIntl(location)
              test.each(cases)(msg, newLanguage => {
                const captures = filterRoutes(translator[newLanguage].toLocal(intl))
                expect(captures.matchRoot).toBe(false)
                expect(captures.languageOnly).toHaveLength(0)
                expect(captures.client).toHaveLength(1)
                expect(captures.client[0]).toHaveProperty(`languageCode`, newLanguage)
                expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
                expect(captures.clientNotFound).toHaveLength(1)
                expect(captures.clientNotFound[0]).toHaveProperty(`languageCode`, newLanguage)
              })
            }
          })
        }
      })
    }
  })
}