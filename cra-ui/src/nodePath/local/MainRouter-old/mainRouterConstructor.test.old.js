import React from "react"
import mainRouterConstructor from "./mainRouterConstructor"
describe(`local/MainRouter: mainRouterConstructor`, () => {
  const options = {
    matchRoot: `function to match the route where the app is mounted`,
    apps: {
      home: {
        AppBody: `HomeAppBody`,
        AppMenu: `HomeAppMenu`,
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
              location: {
                pathname: `english home initial pathname`,
                search: `english home initial search`,
                hash: `english home initial hash`,
              },
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
              location: {
                pathname: `spanish home initial pathname`,
                search: `spanish home initial search`,
                hash: `spanish home initial hash`,
              },
              text: `spanish home navLink text`,
              icon: `spanish home navLink icon`,
            },
          },
        },
      },
      counter: {
        AppBody: `CounterAppBody`,
        AppMenu: `CounterAppMenu`,
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
              location: {
                pathname: `english counter initial pathname`,
                search: `english counter initial search`,
                hash: `english counter initial hash`,
              },
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
              location: {
                pathname: `spanish counter initial pathname`,
                search: `spanish counter initial search`,
                hash: `spanish counter initial hash`,
              },
              text: `spanish counter navLink text`,
              icon: `spanish counter navLink icon`,
            },
          },
        },
      },
      notFound: {
        AppBody: `NotFoundAppBody`,
        AppMenu: `NotFoundAppMenu`,
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
              location: {
                pathname: `english notFound initial pathname`,
                search: `english notFound initial search`,
                hash: `english notFound initial hash`,
              },
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
              location: {
                pathname: `spanish notFound initial pathname`,
                search: `spanish notFound initial search`,
                hash: `spanish notFound initial hash`,
              },
              text: `spanish notFound navLink text`,
              icon: `spanish notFound navLink icon`,
            },
          },
        },
      },
    },
  }
  it(`should run`, () => {
    expect(() => mainRouterConstructor.call({}, options)).not.toThrow()
  })
  it(
    `should return the proper values for:
        matchRoot,
        locations,
        appBodies,
        routes,
        appMenus,
        navLinks`,
    () => {
      const self = {}
      mainRouterConstructor.call(self, options)
      const {
        matchRoot,
        locations,
        appBodies,
        routes,
        appMenus,
        navLinks,
      } = self
      expect({
        matchRoot,
        locations,
        appBodies,
        routes,
        appMenus,
        navLinks,
      }).toEqual({
        matchRoot: `function to match the route where the app is mounted`,
        locations: {
          home: {
            original: null,
            translations: {
              en: {
                pathname: `english home initial pathname`,
                search: `english home initial search`,
                hash: `english home initial hash`,
              },
              es: {
                pathname: `spanish home initial pathname`,
                search: `spanish home initial search`,
                hash: `spanish home initial hash`,
              },
            },
          },
          counter: {
            original: null,
            translations: {
              en: {
                pathname: `english counter initial pathname`,
                search: `english counter initial search`,
                hash: `english counter initial hash`,
              },
              es: {
                pathname: `spanish counter initial pathname`,
                search: `spanish counter initial search`,
                hash: `spanish counter initial hash`,
              },
            },
          },
          notFound: {
            original: null,
            translations: {
              en: {
                pathname: `english notFound initial pathname`,
                search: `english notFound initial search`,
                hash: `english notFound initial hash`,
              },
              es: {
                pathname: `spanish notFound initial pathname`,
                search: `spanish notFound initial search`,
                hash: `spanish notFound initial hash`,
              },
            },
          },
        },
        appBodies: [
          {
            appName: `home`,
            AppBody: `HomeAppBody`,
          },
          {
            appName: `counter`,
            AppBody: `CounterAppBody`,
          },
          {
            appName: `notFound`,
            AppBody: `NotFoundAppBody`,
          },
        ],
        routes: [
          {
            appName: `home`,
            languageCode: `en`,
            match: `MatchHomeEnglish`,
          },
          {
            appName: `home`,
            languageCode: `es`,
            match: `MatchHomeSpanish`,
          },
          {
            appName: `counter`,
            languageCode: `en`,
            match: `MatchCounterEnglish`,
          },
          {
            appName: `counter`,
            languageCode: `es`,
            match: `MatchCounterSpanish`,
          },
          {
            appName: `notFound`,
            languageCode: `en`,
            match: `MatchNotFoundEnglish`,
          },
          {
            appName: `notFound`,
            languageCode: `es`,
            match: `MatchNotFoundSpanish`,
          },
        ],
        appMenus: {
          home: `HomeAppMenu`,
          counter: `CounterAppMenu`,
          notFound: `NotFoundAppMenu`,
        },
        navLinks: {
          en: [
            {
              appName: `home`,
              text: `english home navLink text`,
              icon: `english home navLink icon`,
            },
            {
              appName: `counter`,
              text: `english counter navLink text`,
              icon: `english counter navLink icon`,
            },
            {
              appName: `notFound`,
              text: `english notFound navLink text`,
              icon: `english notFound navLink icon`,
            },
          ],
          es: [
            {
              appName: `home`,
              text: `spanish home navLink text`,
              icon: `spanish home navLink icon`,
            },
            {
              appName: `counter`,
              text: `spanish counter navLink text`,
              icon: `spanish counter navLink icon`,
            },
            {
              appName: `notFound`,
              text: `spanish notFound navLink text`,
              icon: `spanish notFound navLink icon`,
            },
          ],
        },
      })
    }
  )
  describe(`makeNotFoundLocation`, () => {
    it(`should make locations for every language`, () => {
      const self = {}
      mainRouterConstructor.call(self, options)
      expect(() => [`en`, `es`].forEach(languageCode => (
        self.makeNotFoundLocation(languageCode, `${languageCode} referrer`)
      ))).not.toThrow()
      expect([`en`, `es`].map(languageCode => (
        self.makeNotFoundLocation(languageCode, `${languageCode} referrer`)
      ))).toEqual([
        {
          pathname: `english notFound initial pathname`,
          search: `english notFound initial search`,
          hash: `english notFound initial hash`,
          state: { referrer: `en referrer` },
        },
        {
          pathname: `spanish notFound initial pathname`,
          search: `spanish notFound initial search`,
          hash: `spanish notFound initial hash`,
          state: { referrer: `es referrer` },
        },
      ])
    })
  })
  it(`should translate[appName][oldLanguage][newLanguage](location)`, () => {
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
    const self = {}
    mainRouterConstructor.call(self, options)
    const results = data.map(({ result }) => result)
    const translate = ({ oldLanguage, newLanguage, appName }) => (
      self.translate[appName][oldLanguage][newLanguage](`start`)
    )
    expect(() => data.forEach(translate)).not.toThrow()
    expect(data.map(translate)).toEqual(results)
  })
})