import React, { useRef, useEffect } from "react"
import globals from "lib/utils/globals"
import renderer from "react-test-renderer"
import DocumentTitle from "./index.js"
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    ...React,
    __esModule: true,
    default: React,
    useRef: jest.fn(),
    useEffect: jest.fn(),
  }
})
jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: { document: {} } }))
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  const cases = [
    [`ref is null`, { current: null }],
    [`ref is not null`, { current: { value: `Initial Title` } }],
  ]
  describe.each(cases)(`<DocumentTitle /> (%s)`, (str, ref) => {
    let html, effect
    beforeAll(() => {
      useRef.mockReturnValueOnce(ref)
      globals.document.title = `Initial Title`
      html = renderer.create(<DocumentTitle value="New Title" />)
      try {
        effect = useEffect.mock.calls[0][0]
        useEffect.mockClear()
      } catch (e) {}
    })
    it(`should render`, () => {
      expect(html.toJSON()).toBeNull()
    })
    it(`should save the initial document title`, () => {
      expect(ref).toEqual({ current: { value: `Initial Title` } })
    })
    it(`should set up a React effect`, () => {
      expect(effect).toBeInstanceOf(Function)
    })
    describe(`useEffect callback`, () => {
      let clearEffect
      beforeAll(() => {
        globals.document.title = `Old Title`
        clearEffect = effect()
      })
      it(`should set the window title`, () => {
        expect(globals).toEqual({ document: { title: `New Title` } })
      })
      it(`should return a clean-up function`, () => {
        expect(clearEffect).toBeInstanceOf(Function)
      })
      describe(`effect clean-up function`, () => {
        it(`should go back to the initial title`, () => {
          clearEffect()
          expect(globals).toEqual({ document: { title: `Initial Title` } })
        })
      })
    })
  })
})