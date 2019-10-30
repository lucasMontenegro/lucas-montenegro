export default function describeLinkTranslators ({ routing, exampleLocations, runMatchers }) {
  const { languageCodes, clientNames, linkTranslators } = routing
  describe(`routing.linkTranslators`, () => {
    it(`should have the right object shape`, () => {
      expect(Object.keys(linkTranslators)).toEqual(clientNames)
    })
    {
      const cases = clientNames.map(clientName => [clientName])
      describe.each(cases)(`routing.linkTranslators.%s`, clientName => {
        const byClient = linkTranslators[clientName]
        it(`should have the right object shape`, () => {
          expect(byClient).toBeInstanceOf(Object)
          expect(Object.keys(byClient)).toEqual(languageCodes)
        })
        {
          const cases = languageCodes.map(oldLanguage => [oldLanguage])
          describe.each(cases)(`routing.linkTranslators.${clientName}.%s`, oldLanguage => {
            const translator = byClient[oldLanguage]
            it(`should have the right object shape`, () => {
              expect(translator).toBeInstanceOf(Object)
              expect(translator.toIntl).toBeInstanceOf(Function)
              expect(translator.toLocal).toBeInstanceOf(Function)
            })
            {
              const cases = []
              exampleLocations.client[clientName][oldLanguage].forEach((location, i) => {
                languageCodes.forEach(newLanguage => {
                  cases.push([i, newLanguage, location])
                })
              })
              const msg = (
                `should translate exampleLocations.client.${clientName}.${oldLanguage}[%d] to %s`
              )
              test.each(cases)(msg, (i, newLanguage, location) => {
                {
                  const captures = runMatchers(location)
                  expect(captures.root).toBe(false)
                  expect(captures.languageOnly).toHaveLength(0)
                  expect(captures.client).toHaveLength(1)
                  expect(captures.client[0]).toHaveProperty(`languageCode`, oldLanguage)
                  expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
                  expect(captures.unknownClient).toHaveLength(1)
                  expect(captures.unknownClient[0]).toHaveProperty(`languageCode`, oldLanguage)
                }
                const intl = translator.toIntl(location)
                const local = byClient[newLanguage].toLocal(intl)
                const captures = runMatchers(local)
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
  })
}