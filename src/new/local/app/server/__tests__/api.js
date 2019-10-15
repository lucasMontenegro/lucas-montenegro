import todo from "new/local/todo/router"
jest.mock(`new/local/todo/router`, () => ({ __esModule: true, default: () => {} }))
describe(`new/local/app/server/api`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`express`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/app/server/api")
  })
})