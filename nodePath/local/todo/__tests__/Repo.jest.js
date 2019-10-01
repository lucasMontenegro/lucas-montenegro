jest.mock(`local/todo/Queries`, () => jest.fn())
const Queries = require("local/todo/Queries")
const Repo = require("local/todo/Repo")
describe(`local/todo/Repo`, () => {
  it(`should create a new instance`, () => {
    const pgp = {}
    const todo = new Repo(null, pgp)
    ;[`create`, `read`, `update`, `delete`].forEach(method => {
      expect(todo).toHaveProperty(method)
      expect(todo[method]).toBeInstanceOf(Function)
    })
    expect(Queries.mock.calls).toHaveLength(1)
    expect(Queries.mock.calls[0]).toHaveLength(1)
    expect(Queries.mock.calls[0][0]).toBe(pgp)
  })
  describe.each([
    [`create`, `none`, null],
    [`read`, `any`, null],
    [`update`, `none`, null],
    [`delete`, `result`, calls => {
      expect(calls).toHaveLength(1)
      expect(calls[0]).toHaveLength(3)
      expect(calls[0][0]).toBe(`sql string`)
      expect(calls[0][1]).toBeNull()
      const fn = calls[0][2]
      expect(fn).toBeInstanceOf(Function)
      const rowCount = {}
      expect(fn({ rowCount })).toBe(rowCount)
    }],
  ])(`todo.%s`, (method, dbMethod, expectDbCalls) => {
    it(`should run the database call`, async () => {
      const renderQuery = jest.fn(() => `sql string`)
      Queries.mockImplementationOnce(() => ({ render: renderQuery }))
      const callDatabase = jest.fn(() => `dbMethodResult`)
      const todo = new Repo({ [dbMethod]: callDatabase })
      expect(await todo[method](`values`)).toBe(`dbMethodResult`)
      expect(renderQuery.mock.calls).toEqual([[method, `values`]])
      if (expectDbCalls) {
        expectDbCalls(callDatabase.mock.calls)
      } else {
        expect(callDatabase.mock.calls).toEqual([[`sql string`]])
      }
    })
  })
})