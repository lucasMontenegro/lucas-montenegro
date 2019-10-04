const mockFn = jest.fn()
jest.mock(`local/utils/extractPgRowCount`, () => `local/utils/extractPgRowCount`)
const pgp = require("local/utils/jest/pgpInstance")
const db = [`none`, `any`, `result`].reduce((db, name) => {
  db[name] = (...args) => {
    const arr = [`db.${name}`, args]
    mockFn(...arr)
    return arr
  }
  return db
}, { $config: { pgp } })
const Repo = require("local/todo/Repo")
describe(`local/todo/Repo`, () => {
  let repo
  beforeAll(() => {
    repo = new Repo(db, `dc`)
  })
  afterEach(() => mockFn.mockClear())
  describe.each([
    [`create`, [`user`, `different description`, `low`]],
    [`read`, `user`],
    [`update`, [`user`, `14`, `high`, `pending`]],
    [`delete`, [`user`, `8`]],
  ])(`repo.%s (values %j)`, (method, values) => {
    it(`should make database calls`, () => {
      expect({
        result: repo[method](values),
        mockFnCalls: mockFn.mock.calls,
      }).toMatchSnapshot()
    })
  })
})