const mockFn = jest.fn()
jest.mock(`local/todo/Repo`, () => jest.fn())
require("local/todo/Repo").mockImplementation((...args) => {
  mockFn(`Todo`, args)
  return { name: `Todo instance` }
})
const extendRepos = require("local/server/pg/extendRepos")
describe(`local/server/pg/extendRepos`, () => {
  afterEach(() => mockFn.mockClear())
  it(`should extend the repo`, () => {
    const db = { name: `db` }
    const dc = { name: `dc` }
    extendRepos(db, dc)
    expect({ db, dc, mockFnCalls: mockFn.mock.calls }).toMatchSnapshot()
  })
})