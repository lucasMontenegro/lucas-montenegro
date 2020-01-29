import globals from "lib/utils/globals"
import renderer from "react-test-renderer"
import React from "react"
import WindowTitle from "./index.js"
jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: {} }))
describe(`./index.js`, () => {
  describe(`<WindowTitle />`, () => {
    let html
    beforeAll(() => {
      globals.document = { title: `` }
      html = renderer.create(<WindowTitle value="Test App" />)
    })
    it(`should render`, () => {
      expect(html.toJSON()).toBeNull()
    })
    it(`should set the window title`, () => {
      expect(globals).toEqual({ document: { title: `Test App` } })
    })
  })
})