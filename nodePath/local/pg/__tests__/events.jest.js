const mockEnv = require("local/helpers/mockEnv")
const events = require("local/pg/events")
describe(`local/pg/events`, () => {
  it(`should not attach any event in "production"`, () => {
    expect(mockEnv(`NODE_ENV`, `production`, events)).toEqual([])
  })
  it(`should attach all events in "development"`, () => {
    expect(mockEnv(`NODE_ENV`, `development`, events))
      .toEqual([`connect`, `disconnect`, `task`, `transact`, `query`])
  })
})