const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const baseUrl = require("../baseUrl")
function makeUrl (appName, languageCode) {
  return `/examples/clients/createNotFound/${appName}/${languageCode}`
}
describe(`local/clients/createNotFound`, () => {
  let navigateTo, update
  const expectToRender = {}
  before(() => {
    browser.url(makeUrl(`home`, `en`))
    {
      const keys = [
        `languageCode`,
        `typeofState`,
        `typeofReferrer`,
        `pathname`,
        `search`,
        `hash`,
      ]
      const elements = keys.reduce((elements, key) => {
        elements[key] = $(`#${key}Input`)
        return elements
      }, {})
      const button = $(`#updateClientLocations`)
      update = function update (values) {
        Object.keys(values).forEach(key => {
          const element = elements[key]
          element.addValue(new Array(element.getValue().length).fill('Backspace'))
          element.addValue(values[key])
        })
        button.click()
      }
    }
    {
      const links = {
        home: $(`#homeLink`),
        notFound: $(`#notFoundLink`),
      }
      navigateTo = {
        home () {
          links.home.click()
        },
        notFound () {
          links.notFound.click()
        },
      }
    }
    expectToRender.home = function home () {
      expect($(`#home`).isDisplayed(), `#home isDisplayed`).to.be.true
    }
    {
      function expectContent (selector, expected) {
        const element = $(selector)
        expect(element.isDisplayed(), `${selector} isDisplayed`).to.be.true
        expected && expect(element.getText(), `${selector} getText`).to.equal(expected)
      }
      function expectTranslation (selector) {
        const element = $(selector)
        expect(element.isDisplayed(), `${selector} isDisplayed`).to.be.true
        expect(element.getText(), `${selector} getText`).to.have.lengthOf.above(1)
      }
      function expectLink (selector, value) {
        const element = $(selector)
        expect(element.isDisplayed(), `${selector} isDisplayed`).to.be.true
        expect(
          element.getAttribute(`href`),
          `${selector} getAttribute href`
        ).to.equal(`${baseUrl}${value}`)
        expect(element.getText(), `${selector} getText`).to.have.lengthOf.above(1)
      }
      expectToRender.baseClient = function baseClient (displayed) {
        if (displayed === `hidden`) {
          expect($(`#BaseClientSpy`).isExisting(), `#BaseClientSpy isExisting`).to.be.false
          return
        }
        ;[
          { selector: `#clientName`, expected: `notFound` },
          { selector: `#appName`, expected: `appName` },
          { selector: `#initialLocation`, expected: `initialLocation` },
          { selector: `#linkTranslators`, expected: `linkTranslators` },
          { selector: `#customClientLocation`, expected: `undefined` },
          { selector: `#anotherProp`, expected: `foo` },
        ].forEach(({ selector, expected }) => expectContent(selector, expected))
        expectTranslation(`#subtitle`)
        expectContent(`#icon`)
      }
      expectToRender.notFound = function notFound (options) {
        switch (options.content) {
          case `error`: {
            expectTranslation(`#error-message`)
            expectContent(`#referrer`, options.referrer)
            expectLink(`#close-not-found`, makeUrl(`notFound`, options.languageCode))
          }
          break
          default: {
            expectTranslation(`#default-message`)
            expectLink(`#go-to-home`, makeUrl(`home`, options.languageCode))
          }
        }
      }
    }
  })
  it(`should render a help message by default`, () => {
    update({ typeofState: `undefined`, typeofReferrer: `undefined` })
    supportedLanguages.forEach(languageCode => {
      update({ languageCode })
      navigateTo.home()
      expectToRender.home()
      expectToRender.baseClient(`hidden`)
      navigateTo.notFound()
      expectToRender.baseClient()
      expectToRender.notFound({ languageCode })
    })
    update({ typeofState: `object` })
    supportedLanguages.forEach(languageCode => {
      update({ languageCode })
      navigateTo.notFound()
      expectToRender.baseClient()
      expectToRender.notFound({ languageCode })
    })
  })
  it(`should render an error message`, () => {
    const location = {
      pathname: `/404`,
      search: `?x=bar&y=baz`,
      hash: `#hash`,
    }
    update({
      typeofState: `object`,
      typeofReferrer: `object`,
      ...location,
    })
    supportedLanguages.forEach(languageCode => {
      update({ languageCode })
      navigateTo.notFound()
      expectToRender.baseClient()
      expectToRender.notFound({
        content: `error`,
        referrer: Object.values(location).join(``),
        languageCode,
      })
    })
  })
  it(`should keep the NotFound base client visible from other clients`, () => {
    update({
      typeofState: `object`,
      typeofReferrer: `object`,
      pathname: `/404`,
    })
    navigateTo.notFound()
    navigateTo.home()
    expectToRender.home()
    expectToRender.baseClient()
  })
  it(`should close the error message and hide the BaseClient on the other clients`, () => {
    const languageCode = `en`
    update({
      languageCode,
      typeofState: `object`,
      typeofReferrer: `object`,
      pathname: `/404`,
    })
    navigateTo.notFound()
    $(`#close-not-found`).click()
    expectToRender.baseClient()
    expectToRender.notFound({ languageCode })
    navigateTo.home()
    expectToRender.baseClient(`hidden`)
  })
})