jest.mock(`local/todo/validators`, () => ({
  post: `post validator`,
  get: `get validator`,
  put: `put validator`,
  delete: `delete validator`,
}))
const validators = require("local/todo/validators")
jest.mock(`local/pg`, () => ({
  db: {
    todo: {
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))
const { db } = require("local/pg")
const controllers = require("local/todo/controllers")
describe(`local/todo/controllers`, () => {
  it(`should export the controllers`, () => {
    expect(controllers.map(({ handler, ...rest }) => ({ ...rest, typeofHandler: typeof handler})))
      .toEqual([
        {
          rest: `post`,
          crud: `create`,
          pathname: ``,
          validator: `post validator`,
          typeofHandler: `function`,
        },
        {
          rest: `get`,
          crud: `read`,
          pathname: ``,
          validator: `get validator`,
          typeofHandler: `function`,
        },
        {
          rest: `put`,
          crud: `update`,
          pathname: `/:todo_id`,
          validator: `put validator`,
          typeofHandler: `function`,
        },
        {
          rest: `delete`,
          crud: `delete`,
          pathname: `/:todo_id`,
          validator: `delete validator`,
          typeofHandler: `function`,
        },
      ])
  })
  it(`should handle post requests`, async () => {
    const req = {
      user: { sub: `req.user.sub` },
      body: { description: `req.body.description`, priority: `req.body.priority` },
    }
    const res = { end: jest.fn() }
    expect(await controllers[0].handler(req, res)).toBeUndefined()
    expect(db.todo.create.mock.calls).toEqual([[
      [`req.user.sub`, `req.body.description`, `req.body.priority`],
    ]])
    expect(res.end.mock.calls).toEqual([[]])
  })
  it(`should handle get requests`, async () => {
    const req = { user: { sub: `req.user.sub` } }
    const res = { json: jest.fn() }
    db.todo.read.mockReturnValue(Promise.resolve(`db.todo.read()`))
    expect(await controllers[1].handler(req, res)).toBeUndefined()
    expect(db.todo.read.mock.calls).toEqual([[`req.user.sub`]])
    expect(res.json.mock.calls).toEqual([[`db.todo.read()`]])
  })
  it(`should handle put requests`, async () => {
    const req = {
      user: { sub: `req.user.sub` },
      params: { todo_id: `req.params.todo_id` },
      body: { status: `req.body.status`, priority: `req.body.priority` },
    }
    const res = { end: jest.fn() }
    expect(await controllers[2].handler(req, res)).toBeUndefined()
    expect(db.todo.update.mock.calls).toEqual([[
      [`req.user.sub`, `req.params.todo_id`, `req.body.priority`, `req.body.status`],
    ]])
    expect(res.end.mock.calls).toEqual([[]])
  })
  it(`should handle delete requests`, async () => {
    const req = { user: { sub: `req.user.sub` }, params: { todo_id: `req.params.todo_id` } }
    const res = { end: jest.fn() }
    expect(await controllers[3].handler(req, res)).toBeUndefined()
    expect(db.todo.delete.mock.calls).toEqual([[[`req.user.sub`, `req.params.todo_id`]]])
    expect(res.end.mock.calls).toEqual([[]])
  })
})