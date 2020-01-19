import React, { useEffect } from "react"
import globals from "lib/utils/globals"
import embedForm from "../embedForm"
import loadScript from "../loadScript"
import renderer from "react-test-renderer"
import WufooForm from "../index.js"
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    ...React,
    default: React,
    useEffect: jest.fn(),
  }
})
jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: {} }))
jest.mock(`../embedForm`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`../loadScript`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  describe(`<WufooForm />`, () => {
    let html, effect
    beforeAll(() => {
      html = renderer.create(<WufooForm hash="hash" height="512" />)
      try {
        effect = useEffect.mock.calls[0][0]
      } catch (e) {}
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
    it(`should set up a react effect`, () => {
      expect(useEffect.mock.calls).toMatchSnapshot()
    })
    describe(`effect (WufooForm is a function)`, () => {
      it(`should call embedForm`, () => {
        globals.window = { WufooForm () {} }
        effect()
        expect(embedForm.mock.calls).toEqual([[`hash`, `512`]])
        embedForm.mockClear()
        expect(loadScript.mock.calls).toEqual([])
      })
    })
    {
      const cases = [[null], [undefined], [``], [{}]]
      describe.each(cases)(`effect (WufooForm is %j)`, WufooForm => {
        it(`should call loadScript`, () => {
          globals.window = { WufooForm }
          effect()
          expect(loadScript.mock.calls).toEqual([[`hash`, `512`]])
          loadScript.mockClear()
          expect(embedForm.mock.calls).toEqual([])
        })
      })
    }
  })
})