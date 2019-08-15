import supportedLanguages from "local/supportedLanguages"
export default function describeRouting (opts) {
  const { languageCodes, routing, exampleLocations } = opts
  const appNames = [`home`, ...opts.appNames, `notFound`]
  const allRoutes = []
  it(`should support all languages`, () => {
    expect(languageCodes).toEqual(supportedLanguages)
  })
  it(`should have the right format`, () => {
    expect(routing).toBeInstanceOf(Object)
    expect(routing.matchRoot).toBeInstanceOf(Function)
    allRoutes.push({ match: routing.matchRoot })
    expect(routing.routes).toBeInstanceOf(Array)
    allRoutes.push(...routing.routes)
    routing.routes.forEach(route => {
      expect(route).toBeInstanceOf(Object)
      expect(typeof route.languageCode).toBe(`string`)
      expect(typeof route.appName).toBe(`string`)
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
          expect(`appName` in route).toBe(false)
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
      locationsValues.forEach(locationsByApp => {
        expect(locationsByApp).toBeInstanceOf(Object)
        Object.values(locationsByApp).forEach(locationsByLanguage => (
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
        expect(`appName` in route).toBe(false)
        expect(`languageCode` in route).toBe(false)
        expect(route.match).toEqual(routing.matchRoot)
      })
    })
  })
  describe(`routing.routes`, () => {
    it(`should support all apps and languages`, () => {
      const actual = appNames.reduce((actual, appName) => {
        actual[appName] = routing.routes
          .filter(r => r.appName === appName)
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
      const expected = appNames.reduce((expected, appName) => {
        expected[appName] = langs
        return expected
      }, {})
      expect(actual).toEqual(expected)
    })
    it(`should not have colliding routes`, () => {
      appNames.forEach(appName => {
        const locationsByLanguage = exampleLocations.main[appName]
        supportedLanguages.forEach(languageCode => {
          locationsByLanguage[languageCode].forEach(location => {
            const caps = allRoutes.filter(route => route.match(location))
            expect(caps.length).toEqual(2)
            const route = caps[0]
            expect(route.appName).toEqual(appName)
            expect(route.languageCode).toEqual(languageCode)
            const notFound = caps[1]
            expect(`appName` in notFound).toBe(false)
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
          expect(`appName` in route).toBe(false)
          expect(route.languageCode).toEqual(languageCode)
          const notFound = caps[1]
          if (notFound) {
            expect(`appName` in notFound).toBe(false)
            expect(notFound.languageCode).toEqual(languageCode)
          }
        })
        exampleLocations.languageRoutes.notFound[languageCode].forEach(location => {
          const caps = allRoutes.filter(route => route.match(location))
          expect(caps.length).toEqual(1)
          const route = caps[0]
          expect(`appName` in route).toBe(false)
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
      Object.keys(routing.locations).forEach(appName => {
        const locationsByLanguage = routing.locations[appName]
        Object.keys(locationsByLanguage).forEach(languageCode => {
          const caps = allRoutes.filter(route => route.match(locationsByLanguage[languageCode]))
          expect(caps.length).toEqual(2)
          const route = caps[0]
          expect(route.appName).toEqual(appName)
          expect(route.languageCode).toEqual(languageCode)
          const notFound = caps[1]
          expect(`appName` in notFound).toBe(false)
          expect(notFound.languageCode).toEqual(languageCode)
        })
      })
    })
  })
}