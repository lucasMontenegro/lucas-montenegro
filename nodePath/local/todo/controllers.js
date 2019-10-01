const validators = require("local/todo/validators")
const { db } = require("local/pg")
const controllers = module.exports = []
controllers.push({
  rest: `post`,
  crud: `create`,
  pathname: ``,
  validator: validators.post,
  async handler (req, res) {
    const { body } = req
    await db.todo.create([req.user.sub, body.description, body.priority])
    res.end()
  },
})
controllers.push({
  rest: `get`,
  crud: `read`,
  pathname: ``,
  validator: validators.get,
  async handler (req, res) {
    res.json(await db.todo.read(req.user.sub))
  },
})
controllers.push({
  rest: `put`,
  crud: `update`,
  pathname: `/:todo_id`,
  validator: validators.put,
  async handler (req, res) {
    const { body } = req
    await db.todo.update([req.user.sub, req.params.todo_id, body.priority, body.status])
    res.end()
  },
})
controllers.push({
  rest: `delete`,
  crud: `delete`,
  pathname: `/:todo_id`,
  validator: validators.delete,
  async handler (req, res) {
    const { body } = req
    await db.todo.delete([req.user.sub, req.params.todo_id])
    res.end()
  },
})