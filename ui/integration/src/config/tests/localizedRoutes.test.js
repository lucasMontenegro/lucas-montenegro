import config from "../index"
import options from "../options"

describe(`Localized Routes`, () => {
  config.appNames.forEach(appName => {

    describe(`App Name: "${appName}"`, () => {
      const app = options.apps[appName]
      config.languageCodes.forEach(language => {

        describe(`Language Code: "${language}"`, () => {
          const locale = app.locales[language]
          app.exampleLocations.forEach((location, i) => {

            describe(`Example Location Number ${i}`, () => {
              const { toLocal, toIntl } = locale.translateLink
              const localized = toLocal(location)
              test(`toIntl(toLocal(location)) should equal location`, () => {
                expect(toIntl(localized)).toEqual(location)
              })
              const found = config.routes.find(route => route.match(localized))
              test(`should allways find a route`, () => {
                expect(found).toBeTruthy()
              })
              test(`the route should contain the appropriate language code and app name`, () => {
                expect(found).toHaveProperty(`name`, appName)
                expect(found).toHaveProperty(`language`, language)
              })
            })
          })
        })
      })
    })
  })
})

