import todo from "lib/todo/router"
jest.mock(`lib/todo/router`, () => ({ __esModule: true, default: () => {} }))
describe(`server/api`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`express`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("server/api")
  })
})