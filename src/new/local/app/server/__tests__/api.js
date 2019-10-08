jest.mock(`new/local/todo/router`, () => ({ default: () => {} }))
describe(`new/local/app/server/api`, () => {
  it(`should run`, () => {
    require("new/local/app/server/api")
  })
})