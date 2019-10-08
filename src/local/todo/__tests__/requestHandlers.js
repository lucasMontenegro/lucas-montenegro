const mockFn = jest.fn()
const createMockFn = name => (...args) => {
  const arr = [name, args]
  mockFn(...arr)
  return arr
}
jest.mock(`new/local/postgres`, () => ({}))
;[`create`, `read`, `update`, `delete`].reduce((db, crud) => {
  db.todo[crud] = createMockFn(`db.todo.${crud}`)
  return db
}, require("new/local/postgres").db = { todo: {} })
const req = {
  user: { sub: `req.user.sub` },
  body: {
    description: `req.body.description`,
    priority: `req.body.priority`,
    status: `req.body.status`,
  },
  params: { todo_id: `req.params.todo_id` },
}
const res = [`end`, `json`].reduce((res, name) => {
  res[name] = createMockFn(`res.${name}`)
  return res
}, {})
const requestHandlers = require("local/todo/requestHandlers")
describe(`local/todo/requestHandlers`, () => {
  afterEach(() => mockFn.mockClear())
  describe.each([[`post`], [`get`], [`put`], [`delete`]])(`requestHandlers.%s`, rest => {
    it(`should handle requests`, async () => {
      await requestHandlers[rest](req, res)
      expect(mockFn.mock.calls).toMatchSnapshot()
    })
  })
})