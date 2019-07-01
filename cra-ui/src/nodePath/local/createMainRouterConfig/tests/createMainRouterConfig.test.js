import React from "react"
import createMainRouterConfig from "local/createMainRouterConfig"
describe(`local/createMainRouterConfig`, () => {
  const config = createMainRouterConfig({
    defaultLanguage: `en`,
    languages: {
      en: {
        name: `english`,
        displayName: `English`,
      },
      es: {
        name: `español`,
        displayName: `Español`,
      },
    },
    apps: {
      home: {
        Component: `HomeComponent`,
        locales: {
          en: {
            match: `MatchHomeEnglish`,
            translateLink: {
              toIntl (str) {
                return `${str}: from english to international home`
              },
              toLocal (str) {
                return `${str}: to english home`
              },
            },
            navLink: {
              location: `english home initial location`,
              text: `english home navLink text`,
              icon: `english home navLink icon`,
            },
          },
          es: {
            match: `MatchHomeSpanish`,
            translateLink: {
              toIntl (str) {
                return `${str}: from spanish to international home`
              },
              toLocal (str) {
                return `${str}: to spanish home`
              },
            },
            navLink: {
              location: `spanish home initial location`,
              text: `spanish home navLink text`,
              icon: `spanish home navLink icon`,
            },
          },
        },
      },
      counter: {
        Component: `CounterComponent`,
        locales: {
          en: {
            match: `MatchCounterEnglish`,
            translateLink: {
              toIntl (str) {
                return `${str}: from english to international counter`
              },
              toLocal (str) {
                return `${str}: to english counter`
              },
            },
            navLink: {
              location: `english counter initial location`,
              text: `english counter navLink text`,
              icon: `english counter navLink icon`,
            },
          },
          es: {
            match: `MatchCounterSpanish`,
            translateLink: {
              toIntl (str) {
                return `${str}: from spanish to international counter`
              },
              toLocal (str) {
                return `${str}: to spanish counter`
              },
            },
            navLink: {
              location: `spanish counter initial location`,
              text: `spanish counter navLink text`,
              icon: `spanish counter navLink icon`,
            },
          },
        },
      },
      notFound: {
        Component: `NotFoundComponent`,
        locales: {
          en: {
            match: `MatchNotFoundEnglish`,
            translateLink: {
              toIntl (str) {
                return `${str}: from english to international notFound`
              },
              toLocal (str) {
                return `${str}: to english notFound`
              },
            },
            navLink: {
              location: `english notFound initial location`,
              text: `english notFound navLink text`,
              icon: `english notFound navLink icon`,
            },
          },
          es: {
            match: `MatchNotFoundSpanish`,
            translateLink: {
              toIntl (str) {
                return `${str}: from spanish to international notFound`
              },
              toLocal (str) {
                return `${str}: to spanish notFound`
              },
            },
            navLink: {
              location: `spanish notFound initial location`,
              text: `spanish notFound navLink text`,
              icon: `spanish notFound navLink icon`,
            },
          },
        },
      },
    },
  })
  it(`should return an object`, () => {
    expect(config).toBeInstanceOf(Object)
  })
  describe(
    `config.defaultLanguage, config.languageCodes, config.languages, config.appNames and`+
    ` config.navLinks`,
    () => {
      it(`should return the proper values`, () => {
        const { defaultLanguage, languageCodes, languages, appNames, navLinks } = config
        expect({ defaultLanguage, languageCodes, languages, appNames, navLinks }).toEqual({
          defaultLanguage: `en`,
          languageCodes: [`en`, `es`],
          languages: [
            {
              code: `en`,
              name: `english`,
              displayName: `English`,
            },
            {
              code: `es`,
              name: `español`,
              displayName: `Español`,
            },
          ],
          appNames: [`home`, `counter`, `notFound`],
          navLinks: {
            initialLocations: {
              en: {
                home: `english home initial location`,
                counter: `english counter initial location`,
                notFound: `english notFound initial location`,
              },
              es: {
                home: `spanish home initial location`,
                counter: `spanish counter initial location`,
                notFound: `spanish notFound initial location`,
              },
            },
            byLanguage: {
              en: [
                {
                  name: `home`,
                  text: `english home navLink text`,
                  icon: `english home navLink icon`,
                },
                {
                  name: `counter`,
                  text: `english counter navLink text`,
                  icon: `english counter navLink icon`,
                },
                {
                  name: `notFound`,
                  text: `english notFound navLink text`,
                  icon: `english notFound navLink icon`,
                },
              ],
              es: [
                {
                  name: `home`,
                  text: `spanish home navLink text`,
                  icon: `spanish home navLink icon`,
                },
                {
                  name: `counter`,
                  text: `spanish counter navLink text`,
                  icon: `spanish counter navLink icon`,
                },
                {
                  name: `notFound`,
                  text: `spanish notFound navLink text`,
                  icon: `spanish notFound navLink icon`,
                },
              ],
            },
          },
        })
      })
    }
  )
  describe(`config.routes`, () => {
    it(`shoud be defined`, () => {
      expect(config.routes).toBeInstanceOf(Array)
      expect(config.routes.length).toEqual(8)
    })
    describe(`homeRedirect`, () => {
      const route = config.routes[0]
      it(`should have "key" and "isRedirect" properties`, () => {
        expect(route).toHaveProperty(`key`, `homeRedirect`)
        expect(route).toHaveProperty(`isRedirect`, true)
      })
      it(`should match the root path`, () => {
        expect(route).toHaveProperty(`match`)
        expect(route.match).toBeInstanceOf(Function)
        expect(route.match(``)).toEqual(true)
        expect(route.match(`/`)).toEqual(true)
      })
      it(`should render`, () => {
        expect(route).toHaveProperty(`Component`)
        expect(route.Component).toBeInstanceOf(Function)
        expect(() => {
          <React.Fragment>
            <route.Component />
            <route.Component
              match
              frameProps={{
                navLinks: {
                  home: {
                    path: `/english/home`,
                    query: ``,
                    hash: ``,
                  },
                },
              }}
            />
          </React.Fragment>
        }).not.toThrow()
      })
    })
    describe(`app routes`, () => {
      it(`should have the right data`, () => {
        expect(config.routes.slice(1, 7)).toEqual([
          {
            key: `home.en`,
            name: `home`,
            isRedirect: false,
            language: `en`,
            match: `MatchHomeEnglish`,
            Component: `HomeComponent`,
          },
          {
            key: `home.es`,
            name: `home`,
            isRedirect: false,
            language: `es`,
            match: `MatchHomeSpanish`,
            Component: `HomeComponent`,
          },
          {
            key: `counter.en`,
            name: `counter`,
            isRedirect: false,
            language: `en`,
            match: `MatchCounterEnglish`,
            Component: `CounterComponent`,
          },
          {
            key: `counter.es`,
            name: `counter`,
            isRedirect: false,
            language: `es`,
            match: `MatchCounterSpanish`,
            Component: `CounterComponent`,
          },
          {
            key: `notFound.en`,
            name: `notFound`,
            isRedirect: false,
            language: `en`,
            match: `MatchNotFoundEnglish`,
            Component: `NotFoundComponent`,
          },
          {
            key: `notFound.es`,
            name: `notFound`,
            isRedirect: false,
            language: `es`,
            match: `MatchNotFoundSpanish`,
            Component: `NotFoundComponent`,
          },
        ])
      })
    })
    describe(`notFoundRedirect`, () => {
      const route = config.routes[7]
      it(`should have "key" and "isRedirect" properties`, () => {
        expect(route).toHaveProperty(`key`, `notFoundRedirect`)
        expect(route).toHaveProperty(`isRedirect`, true)
      })
      it(`should match everything`, () => {
        expect(route).toHaveProperty(`match`)
        expect(route.match).toBeInstanceOf(Function)
        expect(route.match()).toEqual(true)
        expect(route.match(`/some/path`)).toEqual(true)
      })
      it(`should render`, () => {
        expect(route).toHaveProperty(`Component`)
        expect(route.Component).toBeInstanceOf(Function)
        expect(() => {
          <React.Fragment>
            <route.Component />
            <route.Component
              match
              frameProps={{
                navLinks: {
                  notFound: {
                    path: `/english/not-found`,
                    query: ``,
                    hash: ``,
                  },
                },
              }}
            />
            <route.Component
              match
              frameProps={{
                navLinks: {
                  notFound: {
                    path: `/english/not-found`,
                    query: ``,
                    hash: ``,
                    state: { hmm: `hmm!` },
                  },
                },
              }}
            />
          </React.Fragment>
        }).not.toThrow()
      })
    })
  })
  describe(`config.translateLocationFrom`, () => {
    const { translateLocationFrom } = config
    const data = [
      {
        oldLanguage: `en`,
        newLanguage: `en`,
        appName: `home`,
        result: `start`,
      },
      {
        oldLanguage: `es`,
        newLanguage: `es`,
        appName: `home`,
        result: `start`,
      },
      {
        oldLanguage: `en`,
        newLanguage: `es`,
        appName: `home`,
        result: `start: from english to international home: to spanish home`,
      },
      {
        oldLanguage: `es`,
        newLanguage: `en`,
        appName: `home`,
        result: `start: from spanish to international home: to english home`,
      },
      {
        oldLanguage: `en`,
        newLanguage: `en`,
        appName: `counter`,
        result: `start`,
      },
      {
        oldLanguage: `es`,
        newLanguage: `es`,
        appName: `counter`,
        result: `start`,
      },
      {
        oldLanguage: `en`,
        newLanguage: `es`,
        appName: `counter`,
        result: `start: from english to international counter: to spanish counter`,
      },
      {
        oldLanguage: `es`,
        newLanguage: `en`,
        appName: `counter`,
        result: `start: from spanish to international counter: to english counter`,
      },
      {
        oldLanguage: `en`,
        newLanguage: `en`,
        appName: `notFound`,
        result: `start`,
      },
      {
        oldLanguage: `es`,
        newLanguage: `es`,
        appName: `notFound`,
        result: `start`,
      },
      {
        oldLanguage: `en`,
        newLanguage: `es`,
        appName: `notFound`,
        result: `start: from english to international notFound: to spanish notFound`,
      },
      {
        oldLanguage: `es`,
        newLanguage: `en`,
        appName: `notFound`,
        result: `start: from spanish to international notFound: to english notFound`,
      },
    ]
    const results = data.map(({ result }) => result)
    it(`should translateLocationFrom[oldLanguage].to[newLanguage][appName]`, () => {
      const translate = ({ oldLanguage, newLanguage, appName }) => (
        translateLocationFrom[oldLanguage].to[newLanguage][appName](`start`)
      )
      expect(() => data.forEach(translate)).not.toThrow()
      expect(data.map(translate)).toEqual(results)
    })
    it(`should translateLocationFrom[oldLanguage].for[appName][newLanguage]`, () => {
      const translate = ({ oldLanguage, newLanguage, appName }) => (
        translateLocationFrom[oldLanguage].for[appName][newLanguage](`start`)
      )
      expect(() => data.forEach(translate)).not.toThrow()
      expect(data.map(translate)).toEqual(results)
    })
  })
})