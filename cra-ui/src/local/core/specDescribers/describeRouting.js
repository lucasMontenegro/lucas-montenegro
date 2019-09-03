import supportedLanguages from "local/supportedLanguages"
export default function describeRouting (opts) {
  const { routing, exampleLocations } = opts
  const clientNames = [`home`, ...opts.clientNames, `notFound`]
  const allRoutes = []
  it(`should have the right format`, () => {
    expect(routing).toBeInstanceOf(Object)
    expect(routing.matchRoot).toBeInstanceOf(Function)
    allRoutes.push({ match: routing.matchRoot })
    expect(routing.routes).toBeInstanceOf(Array)
    allRoutes.push(...routing.routes)
    routing.routes.forEach(route => {
      expect(route).toBeInstanceOf(Object)
      expect(typeof route.languageCode).toBe(`string`)
      expect(typeof route.clientName).toBe(`string`)
      expect(route.match).toBeInstanceOf(Function)
    })
    {
      expect(routing.languageRoutes).toBeInstanceOf(Object)
      expect(`root` in routing.languageRoutes).toBe(true)
      expect(`notFound` in routing.languageRoutes).toBe(true)
      const languageRoutesValues = Object.values(routing.languageRoutes)
      expect(languageRoutesValues.length).toBe(2)
      languageRoutesValues.forEach(arr => {
        expect(arr).toBeInstanceOf(Array)
        allRoutes.push(...arr)
        arr.forEach(route => {
          expect(route).toBeInstanceOf(Object)
          expect(typeof route.languageCode).toBe(`string`)
          expect(`clientName` in route).toBe(false)
          expect(route.match).toBeInstanceOf(Function)
        })
      })
    }
    {
      expect(routing.locations).toBeInstanceOf(Object)
      expect(`home` in routing.locations).toBe(true)
      expect(`notFound` in routing.locations).toBe(true)
      const locationsValues = Object.values(routing.locations)
      expect(locationsValues.length).toBe(2)
      locationsValues.forEach(locationsByClient => {
        expect(locationsByClient).toBeInstanceOf(Object)
        Object.values(locationsByClient).forEach(locationsByLanguage => (
          expect(locationsByLanguage).toBeInstanceOf(Object)
        ))
      })
    }
  })
  describe(`routing.matchRoot`, () => {
    it(`should not collide with other routes`, () => {
      exampleLocations.root.forEach(location => {
        const caps = allRoutes.filter(route => route.match(location))
        expect(caps.length).toEqual(1)
        const route = caps[0]
        expect(`clientName` in route).toBe(false)
        expect(`languageCode` in route).toBe(false)
        expect(route.match).toEqual(routing.matchRoot)
      })
    })
  })
  describe(`routing.routes`, () => {
    it(`should support all clients and languages`, () => {
      const actual = clientNames.reduce((actual, clientName) => {
        actual[clientName] = routing.routes
          .filter(r => r.clientName === clientName)
          .reduce((langs, r) => {
            const n = langs[r.languageCode]
            langs[r.languageCode] = n ? n + 1 : 1
            return langs
          }, {})
        return actual
      }, {})
      const langs = supportedLanguages.reduce((langs, languageCode) => {
        langs[languageCode] = 1
        return langs
      }, {})
      const expected = clientNames.reduce((expected, clientName) => {
        expected[clientName] = langs
        return expected
      }, {})
      expect(actual).toEqual(expected)
    })
    it(`should not have colliding routes`, () => {
      clientNames.forEach(clientName => {
        const locationsByLanguage = exampleLocations.main[clientName]
        supportedLanguages.forEach(languageCode => {
          locationsByLanguage[languageCode].forEach(location => {
            const caps = allRoutes.filter(route => route.match(location))
            expect(caps.length).toEqual(2)
            const route = caps[0]
            expect(route.clientName).toEqual(clientName)
            expect(route.languageCode).toEqual(languageCode)
            const notFound = caps[1]
            expect(`clientName` in notFound).toBe(false)
            expect(notFound.languageCode).toEqual(languageCode)
          })
        })
      })
    })
  })
  describe(`routing.languageRoutes`, () => {
    it(`should support all languages`, () => {
      Object.values(routing.languageRoutes).forEach(arr => {
        expect(
          arr.reduce((actual, r) => {
            const n = actual[r.languageCode]
            actual[r.languageCode] = n ? n + 1 : 1
            return actual
          }, {})
        ).toEqual(
          supportedLanguages.reduce((expected, languageCode) => {
            expected[languageCode] = 1
            return expected
          }, {})
        )
      })
    })
    it(`should not have colliding routes`, () => {
      supportedLanguages.forEach(languageCode => {
        exampleLocations.languageRoutes.root[languageCode].forEach(location => {
          const caps = allRoutes.filter(route => route.match(location))
          expect(caps.length).toBeLessThan(3)
          expect(caps.length).toBeGreaterThan(0)
          const route = caps[0]
          expect(`clientName` in route).toBe(false)
          expect(route.languageCode).toEqual(languageCode)
          const notFound = caps[1]
          if (notFound) {
            expect(`clientName` in notFound).toBe(false)
            expect(notFound.languageCode).toEqual(languageCode)
          }
        })
        exampleLocations.languageRoutes.notFound[languageCode].forEach(location => {
          const caps = allRoutes.filter(route => route.match(location))
          expect(caps.length).toEqual(1)
          const route = caps[0]
          expect(`clientName` in route).toBe(false)
          expect(route.languageCode).toEqual(languageCode)
        })
      })
    })
  })
  describe(`routing.locations`, () => {
    it(`should support all the languages`, () => {
      Object.values(routing.locations).forEach(locationsByLanguage => (
        supportedLanguages.forEach(languageCode => (
          expect(languageCode in locationsByLanguage).toBe(true)
        ))
      ))
    })
    it(`should match their corresponding routes`, () => {
      Object.keys(routing.locations).forEach(clientName => {
        const locationsByLanguage = routing.locations[clientName]
        Object.keys(locationsByLanguage).forEach(languageCode => {
          const caps = allRoutes.filter(route => route.match(locationsByLanguage[languageCode]))
          expect(caps.length).toEqual(2)
          const route = caps[0]
          expect(route.clientName).toEqual(clientName)
          expect(route.languageCode).toEqual(languageCode)
          const notFound = caps[1]
          expect(`clientName` in notFound).toBe(false)
          expect(notFound.languageCode).toEqual(languageCode)
        })
      })
    })
  })
}