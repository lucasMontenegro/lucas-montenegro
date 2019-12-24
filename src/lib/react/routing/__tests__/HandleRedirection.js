import { useRoute } from "../context"
import { Redirect } from "react-router-dom"
import renderer from "react-test-renderer"
import React from "react"
import HandleRedirection from "../HandleRedirection"
jest.mock(`../context`, () => ({ __esModule: true, useRoute: jest.fn() }))
jest.mock(`react-router-dom`, () => ({ __esModule: true, Redirect: jest.fn() }))
Redirect.mockImplementation(props => (
  <div className="redirect">{JSON.stringify(props.to)}</div>
))
describe(`../HandleRedirection`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react`, `react-router-dom`])).toMatchSnapshot()
  })
  {
    const cases = [[null], [{ pathname: `/somewhere` }]]
    describe.each(cases)(`HandleRedirection (redirect location %j)`, redirectLocation => {
      let node
      beforeAll(() => {
        useRoute.mockReturnValueOnce({ redirect: redirectLocation })
        node = renderer.create(<HandleRedirection />)
      })
      it(`should render`, () => {
        expect(node.toJSON()).toMatchSnapshot()
      })
    })
  }
})