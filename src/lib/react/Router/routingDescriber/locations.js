export default function describeLocations ({ routing, exampleLocations, runMatchers }) {
  const { languageCodes, clientNames, locations } = routing
  const initialLanguage = languageCodes[0]
  describe(`routing.locations ("${initialLanguage}" initial language)`, () => {
    it(`should have the right object shape`, () => {
      expect(Object.keys(locations)).toEqual(clientNames)
    })
    {
      const cases = clientNames.map(clientName => [clientName])
      describe.each(cases)(`routing.locations.%s`, clientName => {
        const location = locations[clientName]
        it(`should have the right object shape`, () => {
          expect(location).toBeInstanceOf(Object)
        })
        it(`should match its corresponding routes`, () => {
          const captures = runMatchers(location)
          expect(captures.root).toBe(false)
          expect(captures.languageOnly).toHaveLength(0)
          expect(captures.client).toHaveLength(1)
          expect(captures.client[0]).toHaveProperty(`languageCode`, initialLanguage)
          expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
          expect(captures.unknownClient).toHaveLength(1)
          expect(captures.unknownClient[0]).toHaveProperty(`languageCode`, initialLanguage)
        })
        {
          const cases = languageCodes.map(newLanguage => [newLanguage])
          const msg = (
            `should translate routing.locations.${clientName} from ${initialLanguage} to %s`
          )
          const translator = routing.linkTranslators[clientName]
          const intl = translator[initialLanguage].toIntl(location)
          test.each(cases)(msg, newLanguage => {
            const captures = runMatchers(translator[newLanguage].toLocal(intl))
            expect(captures.root).toBe(false)
            expect(captures.languageOnly).toHaveLength(0)
            expect(captures.client).toHaveLength(1)
            expect(captures.client[0]).toHaveProperty(`languageCode`, newLanguage)
            expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
            expect(captures.unknownClient).toHaveLength(1)
            expect(captures.unknownClient[0]).toHaveProperty(`languageCode`, newLanguage)
          })
        }
      })
    }
  })
}