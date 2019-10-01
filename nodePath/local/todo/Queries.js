const pgMinify = require("pg-minify")
function minify (sql) {
  return pgMinify(sql, { compress: true, removeAll: true })
}
const templates = {
  create: minify(`
    INSERT INTO todo (user_id, description, priority)
    VALUES ($1, $2, $3)
  `),
  read: minify(`
    SELECT todo_id, description, priority, status, created_on, updated_on
    FROM todo
    WHERE user_id = $1
  `),
  update: minify(`
    UPDATE todo
    SET priority=$3, status=$4, updated_on=NOW()
    WHERE user_id = $1 AND todo_id = $2
  `),
  delete: minify(`
    DELETE FROM todo
    WHERE user_id = $1 AND todo_id = $2
  `),
}
module.exports = class TodoQueries {
  constructor (pgp) {
    this.pgp = pgp
  }
  render (method, values) {
    return this.pgp.as.format(templates[method], values)
  }
}