import TranslateLocation from "local/TranslateLocation"
const options = {
  languageCodes: [`en`, `es`],
  appNames: [`home`, `counter`, `notFound`],
  translators: {
    home: {
      en: {
        toIntl (str) {
          return `${str}: from english to international home`
        },
        toLocal (str) {
          return `${str}: to english home`
        },
      },
      es: {
        toIntl (str) {
          return `${str}: from spanish to international home`
        },
        toLocal (str) {
          return `${str}: to spanish home`
        },
      },
    },
    counter: {
      en: {
        toIntl (str) {
          return `${str}: from english to international counter`
        },
        toLocal (str) {
          return `${str}: to english counter`
        },
      },
      es: {
        toIntl (str) {
          return `${str}: from spanish to international counter`
        },
        toLocal (str) {
          return `${str}: to spanish counter`
        },
      },
    },
    notFound: {
      en: {
        toIntl (str) {
          return `${str}: from english to international notFound`
        },
        toLocal (str) {
          return `${str}: to english notFound`
        },
      },
      es: {
        toIntl (str) {
          return `${str}: from spanish to international notFound`
        },
        toLocal (str) {
          return `${str}: to spanish notFound`
        },
      },
    },
  },
}
const expected = [
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
describe(`local/TranslateLocation`, () => {
  const translateLocationFrom = new TranslateLocation(options)
  const expectedOutputs = expected.map(({ result }) => result)
  it(`should translateLocationFrom[oldLanguage].to[newLanguage][appName]`, () => {
    const translate = ({ oldLanguage, newLanguage, appName }) => (
      translateLocationFrom[oldLanguage].to[newLanguage][appName](`start`)
    )
    expect(() => expected.forEach(translate)).not.toThrow()
    expect(expected.map(translate)).toEqual(expectedOutputs)
  })
  it(`should translateLocationFrom[oldLanguage].for[appName][newLanguage]`, () => {
    const translate = ({ oldLanguage, newLanguage, appName }) => (
      translateLocationFrom[oldLanguage].for[appName][newLanguage](`start`)
    )
    expect(() => expected.forEach(translate)).not.toThrow()
    expect(expected.map(translate)).toEqual(expectedOutputs)
  })
})