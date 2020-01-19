import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import renderer from "react-test-renderer"
import CreateDestroy from "../CreateDestroy.js"
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    ...React,
    default: React,
    useState: jest.fn(),
  }
})
jest.mock(`lib/react/utils/Div`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Div" /> }
})
jest.mock(`@material-ui/core/Button`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: jest.fn(props => <button {...props} />) }
})
describe(`../index.js`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `@material-ui/core`])).toMatchSnapshot()
  })
  const cases = [
    [true, { children: `foo` }, false],
    [true, null, false],
    [false, { children: `foo` }, true],
    [false, null, true],
  ]
  const msg = `<CreateDestroy />  (render %j, Component props %j)`
  describe.each(cases)(msg, (render, props, newRender) => {
    let html
    const setRender = jest.fn()
    beforeAll(() => {
      useState.mockReturnValueOnce([render, setRender])
      function Component (props) {
        return <div className="Component">{props.children}</div>
      }
      html = renderer.create(
        <CreateDestroy id="id" box={256} Component={Component} props={props} />
      )
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
    describe(`Button props.onClick`, () => {
      let setRenderCallback
      beforeAll(() => {
        try {
          Button.mock.calls[0][0].onClick()
          Button.mockClear()
          setRenderCallback = setRender.mock.calls[0][0]
        } catch (e) {}
      })
      it(`should call setRender`, () => {
        expect(setRender.mock.calls).toHaveLength(1)
        expect(setRender.mock.calls[0]).toHaveLength(1)
        expect(setRender.mock.calls[0][0]).toBeInstanceOf(Function)
      })
      describe(`setRender callback`, () => {
        it(`should toggle the render value`, () => {
          expect(setRenderCallback(render)).toBe(newRender)
        })
      })
    })
  })
})