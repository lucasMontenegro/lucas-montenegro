import React, { useState } from "react"
import MuiTextField from "@material-ui/core/TextField"
import renderer from "react-test-renderer"
import TextField from "../TextField"
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    ...React,
    __esModule: true,
    default: React,
    useState: jest.fn(),
  }
})
jest.mock(`lib/react/utils/Div`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Div" /> }
})
jest.mock(`@material-ui/core/TextField`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(props => <input {...props} className="MuiTextField" />),
  }
})
jest.mock(`@material-ui/core/Button`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <button {...props} className="Button" onClick={props.onClick()} />,
  }
})
describe(`../TextField`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`, `@material-ui/core`])).toMatchSnapshot()
  })
  describe.each([[`custom-id`], [undefined]])(`<TextField /> (id %j)`, id => {
    const setValue = jest.fn()
    let html
    beforeAll(() => {
      useState.mockReturnValueOnce([`value`, setValue])
      html = renderer.create(
        <TextField id={id} initialValue="initial value" onSave={() => `props.onSave()`} />
      )
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
    describe(`MuiTextField onChange prop`, () => {
      afterAll(() => {
        MuiTextField.mockClear()
      })
      it(`should be a function`, () => {
        expect(MuiTextField).toHaveProperty([`mock`, `calls`, 0, 0, `onChange`])
      })
      it(`should update the state`, () => {
        const { onChange } = MuiTextField.mock.calls[0][0]
        expect(onChange).toBeInstanceOf(Function)
        onChange({ target: { value: `new value` } })
        expect(setValue.mock.calls).toEqual([[`new value`]])
        setValue.mockClear()
      })
    })
  })
})