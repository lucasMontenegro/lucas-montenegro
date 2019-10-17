export default function describeRouting (opts) {
  const { routing, languageCodes, exampleLocations } = opts
  const clientNames = [`home`, ...opts.clientNames, `notFound`]
  function filterRoutes (location) {
    return [`languageOnly`, `client`, `clientNotFound`].reduce((captures, name) => {
      captures[name] = routing.routes[name].filter(route => route.match(location))
      return captures
    }, { matchRoot: routing.routes.matchRoot(location) })
  }
  it(`should have the right object shape`, () => {
    expect(Object.keys(routing)).toEqual([`locations`, `linkTranslators`, `routes`])
    Object.values(routing).forEach(obj => {
      expect(obj).toBeInstanceOf(Object)
    })
  })
  describe(`routing.routes`, () => {
    it(`should have the right object shape`, () => {
      const { routes } = routing
      expect(Object.keys(routes)).toHaveLength(4)
      expect(routes.matchRoot).toBeInstanceOf(Function)
      expect(routes.languageOnly).toBeInstanceOf(Array)
      expect(routes.client).toBeInstanceOf(Array)
      expect(routes.clientNotFound).toBeInstanceOf(Array)
    })
    describe(`routing.routes.matchRoot`, () => {
      it(`should not collide with other routes`, () => {
        exampleLocations.matchRoot.forEach(location => {
          const captures = filterRoutes(location)
          expect(captures.matchRoot).toBe(true)
          expect(captures.languageOnly).toHaveLength(0)
          expect(captures.client).toHaveLength(0)
          expect(captures.clientNotFound).toHaveLength(0)
        })
      })
    })
    describe(`routing.routes.languageOnly`, () => {
      it(`should have the right object shape`, () => {
        routing.routes.languageOnly.forEach((route, i) => {
          expect(Object.keys(route)).toEqual([`languageCode`, `match`])
          expect(route.languageCode).toBe(languageCodes[i])
          expect(route.match).toBeInstanceOf(Function)
        })
      })
      it(`should not have colliding routes`, () => {
        languageCodes.forEach(languageCode => {
          exampleLocations.languageOnly[languageCode].forEach(location => {
            const captures = filterRoutes(location)
            expect(captures.matchRoot).toBe(false)
            expect(captures.languageOnly).toHaveLength(1)
            expect(captures.languageOnly[0]).toHaveProperty(`languageCode`, languageCode)
            expect(captures.client).toHaveLength(0)
            expect(captures.clientNotFound).toHaveLength(0)
          })
        })
      })
    })
    describe(`routing.routes.client`, () => {
      it(`should have the right object shape`, () => {
        const arr = []
        clientNames.forEach(clientName => languageCodes.forEach(languageCode => {
          arr.push({ clientName, languageCode })
        }))
        routing.routes.client.forEach((route, i) => {
          expect(Object.keys(route)).toEqual([`clientName`, `languageCode`, `match`])
          const { clientName, languageCode } = arr[i]
          expect(route.clientName).toBe(clientName)
          expect(route.languageCode).toBe(languageCode)
          expect(route.match).toBeInstanceOf(Function)
        })
      })
      it(`should not have colliding routes`, () => {
        languageCodes.forEach(languageCode => {
          clientNames.forEach(clientName => {
            exampleLocations.client[clientName][languageCode].forEach(location => {
              const captures = filterRoutes(location)
              expect(captures.matchRoot).toBe(false)
              expect(captures.languageOnly).toHaveLength(0)
              expect(captures.client).toHaveLength(1)
              expect(captures.client[0]).toHaveProperty(`languageCode`, languageCode)
              expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
              expect(captures.clientNotFound).toHaveLength(1)
              expect(captures.clientNotFound[0]).toHaveProperty(`languageCode`, languageCode)
            })
          })
        })
      })
    })
    describe(`routing.routes.clientNotFound`, () => {
      it(`should have the right object shape`, () => {
        routing.routes.clientNotFound.forEach((route, i) => {
          expect(Object.keys(route)).toEqual([`languageCode`, `match`])
          expect(route.languageCode).toBe(languageCodes[i])
          expect(route.match).toBeInstanceOf(Function)
        })
      })
      it(`should not have colliding routes`, () => {
        languageCodes.forEach(languageCode => {
          exampleLocations.clientNotFound[languageCode].forEach(location => {
            const captures = filterRoutes(location)
            expect(captures.matchRoot).toBe(false)
            expect(captures.languageOnly).toHaveLength(0)
            expect(captures.client).toHaveLength(0)
            expect(captures.clientNotFound).toHaveLength(1)
            expect(captures.clientNotFound[0]).toHaveProperty(`languageCode`, languageCode)
          })
        })
      })
    })
  })
  describe(`routing.linkTranslators`, () => {
    it(`should have the right object shape`, () => {
      clientNames.forEach(clientName => {
        const clientTranslators = routing.linkTranslators[clientName]
        expect(Object.keys(clientTranslators)).toEqual(languageCodes)
        Object.values(clientTranslators).forEach(obj => {
          expect(obj).toBeInstanceOf(Object)
          expect(obj.toIntl).toBeInstanceOf(Function)
          expect(obj.toLocal).toBeInstanceOf(Function)
        })
      })
    })
    it(`should translate every supported language for all clients`, () => {
      clientNames.forEach(clientName => languageCodes.forEach(oldLanguage => {
        const translator = routing.linkTranslators[clientName]
        exampleLocations.client[clientName][oldLanguage].forEach(location => {
          const intl = translator[oldLanguage].toIntl(location)
          languageCodes.forEach(newLanguage => {
            const captures = filterRoutes(translator[newLanguage].toLocal(intl))
            expect(captures.matchRoot).toBe(false)
            expect(captures.languageOnly).toHaveLength(0)
            expect(captures.client).toHaveLength(1)
            expect(captures.client[0]).toHaveProperty(`languageCode`, newLanguage)
            expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
            expect(captures.clientNotFound).toHaveLength(1)
            expect(captures.clientNotFound[0]).toHaveProperty(`languageCode`, newLanguage)
          })
        })
      }))
    })
  })
  describe(`routing.locations`, () => {
    it(`should have the right object shape`, () => {
      clientNames.forEach(clientName => {
        const clientLocations = routing.locations[clientName]
        expect(Object.keys(clientLocations)).toEqual(languageCodes)
        Object.values(clientLocations).forEach(obj => {
          expect(obj).toBeInstanceOf(Object)
        })
      })
    })
    it(`should match their corresponding routes`, () => {
      clientNames.forEach(clientName => languageCodes.forEach(languageCode => {
        const captures = filterRoutes(routing.locations[clientName][languageCode])
        expect(captures.matchRoot).toBe(false)
        expect(captures.languageOnly).toHaveLength(0)
        expect(captures.client).toHaveLength(1)
        expect(captures.client[0]).toHaveProperty(`languageCode`, languageCode)
        expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
        expect(captures.clientNotFound).toHaveLength(1)
        expect(captures.clientNotFound[0]).toHaveProperty(`languageCode`, languageCode)
      }))
    })
    it(`should translate every supported language for all clients`, () => {
      clientNames.forEach(clientName => languageCodes.forEach(oldLanguage => {
        const translator = routing.linkTranslators[clientName]
        const intl = translator[oldLanguage].toIntl(routing.locations[clientName][oldLanguage])
        languageCodes.forEach(newLanguage => {
          const captures = filterRoutes(translator[newLanguage].toLocal(intl))
          expect(captures.matchRoot).toBe(false)
          expect(captures.languageOnly).toHaveLength(0)
          expect(captures.client).toHaveLength(1)
          expect(captures.client[0]).toHaveProperty(`languageCode`, newLanguage)
          expect(captures.client[0]).toHaveProperty(`clientName`, clientName)
          expect(captures.clientNotFound).toHaveLength(1)
          expect(captures.clientNotFound[0]).toHaveProperty(`languageCode`, newLanguage)
        })
      }))
    })
  })
}