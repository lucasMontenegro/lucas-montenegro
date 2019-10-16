import React from "react"
import renderer from "react-test-renderer"
import isProduction from "new/local/utils/isProduction"
import Routes from "new/local/ui/Routes"
jest.mock(`react-router-dom`, () => ({
  __esModule: true,
  BrowserRouter: ({ children }) => <div className="BrowserRouter">{children}</div>,
  Switch: ({ children }) => <div className="Switch">{children}</div>,
  Route: ({ path, component }) => (
    <div className="Route">
      <div className="path">{path}</div>
      <div className="component">{component}</div>
    </div>
  ),
}))
jest.mock(`new/local/utils/isProduction`, () => ({
  __esModule: true,
  default: jest.fn(),
}))
jest.mock(`new/local/ui/App`, () => ({
  __esModule: true,
  default: `new/local/ui/App`,
}))
jest.mock(`new/local/ui/Routes/Examples`, () => ({
  __esModule: true,
  default: `new/local/ui/Routes/Examples`,
}))
jest.mock(`new/local/ui/Routes/OldExamples`, () => ({
  __esModule: true,
  default: `new/local/ui/Routes/OldExamples`,
}))
describe(`new/local/ui/Routes`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`react`, `react-router-dom`])).toMatchSnapshot()
  })
  test.each([[true], [false]])(`should render (isProduction %j)`, isProductionValue => {
    isProduction.mockReturnValueOnce(isProductionValue)
    expect(renderer.create(<Routes />).toJSON()).toMatchSnapshot()
  })
})