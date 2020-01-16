import { db, pgp } from "new/local/postgres"
import requestHandlers from "new/local/todo/requestHandlers"
const mockFn = jest.fn()
const createMockFn = name => (...args) => {
  const arr = [name, args]
  mockFn(...arr)
  return arr
}
jest.mock(`new/local/postgres`, () => ({
  __esModule: true,
  db: {},
  pgp: { as: {} },
}))
pgp.as.format = (...args) => jestUtils.pgpInstance.as.format(...args)
;[`none`, `any`, `result`].reduce((db, name) => {
  db[name] = createMockFn(`db.${name}`)
  return db
}, db)
jest.mock(`new/local/utils/postgres/extractRowCount`, () => ({
  __esModule: true,
  default: `new/local/utils/postgres/extractRowCount`,
}))
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
describe(`local/todo/requestHandlers`, () => {
  afterEach(() => mockFn.mockClear())
  describe.each([[`post`], [`get`], [`put`], [`delete`]])(`requestHandlers.%s`, rest => {
    it(`should handle requests`, async () => {
      await requestHandlers[rest](req, res)
      expect(mockFn.mock.calls).toMatchSnapshot()
    })
  })
})