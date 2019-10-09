import todo from "new/local/todo/router"
jest.mock(`new/local/todo/router`, () => ({ __esModule: true, default: () => {} }))
describe(`new/local/app/server/api`, () => {
  it(`should run`, () => {
    require("new/local/app/server/api")
  })
})