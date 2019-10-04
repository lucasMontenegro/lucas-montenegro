jest.mock(`local/todo/router`, () => () => {})
describe(`local/server/start/api`, () => {
  it(`should run`, () => {
    require("local/server/start/api")
  })
})