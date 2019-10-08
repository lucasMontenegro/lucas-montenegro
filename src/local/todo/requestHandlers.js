const syncRequestHandler = require("local/utils/syncRequestHandler")
const { db } = require("new/local/postgres")
exports.post = syncRequestHandler(async (req, res) => {
  const { body } = req
  await db.todo.create([req.user.sub, body.description, body.priority])
  res.end()
})
exports.get = syncRequestHandler(async (req, res) => {
  res.json(await db.todo.read(req.user.sub))
})
exports.put = syncRequestHandler(async (req, res) => {
  const { body } = req
  await db.todo.update([req.user.sub, req.params.todo_id, body.priority, body.status])
  res.end()
})
exports.delete = syncRequestHandler(async (req, res) => {
  const { body } = req
  await db.todo.delete([req.user.sub, req.params.todo_id])
  res.end()
})