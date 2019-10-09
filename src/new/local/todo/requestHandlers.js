import minifySql from "new/local/utils/minifySql"
import syncRequestHandler from "new/local/utils/syncRequestHandler"
import { db, pgp } from "new/local/postgres"
import extractRowCount from "new/local/utils/postgres/extractRowCount"
const templates = {
  create: minifySql(`
    INSERT INTO todo (user_id, description, priority)
    VALUES ($1, $2, $3)
  `),
  read: minifySql(`
    SELECT todo_id, description, priority, status, created_on, updated_on
    FROM todo
    WHERE user_id = $1
  `),
  update: minifySql(`
    UPDATE todo
    SET priority=$3, status=$4, updated_on=NOW()
    WHERE user_id = $1 AND todo_id = $2
  `),
  delete: minifySql(`
    DELETE FROM todo
    WHERE user_id = $1 AND todo_id = $2
  `),
}
export default {
  post: syncRequestHandler(async (req, res) => {
    const { body } = req
    await db.none(pgp.as.format(templates.create, [req.user.sub, body.description, body.priority]))
    res.end()
  }),
  get: syncRequestHandler(async (req, res) => {
    res.json(db.any(pgp.as.format(templates.read, req.user.sub)))
  }),
  put: syncRequestHandler(async (req, res) => {
    const { body } = req
    const values = [req.user.sub, req.params.todo_id, body.priority, body.status]
    await db.none(pgp.as.format(templates.update, values))
    res.end()
  }),
  delete: syncRequestHandler(async (req, res) => {
    const { body } = req
    const values = [req.user.sub, req.params.todo_id]
    await db.result(pgp.as.format(templates.delete, values), null, extractRowCount)
    res.end()
  }),
}