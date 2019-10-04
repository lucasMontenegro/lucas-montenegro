const pgMinify = require("pg-minify")
const extractPgRowCount = require("local/utils/extractPgRowCount")
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
module.exports = class TodoRepo {
  constructor(db, dc) {
    this.db = db
    this.pgp = db.$config.pgp
  }
  create (values) {
    return this.db.none(this.pgp.as.format(templates.create, values))
  }
  read (user_id) {
    return this.db.any(this.pgp.as.format(templates.read, user_id))
  }
  update (values) {
    return this.db.none(this.pgp.as.format(templates.update, values))
  }
  delete (values) {
    return this.db.result(this.pgp.as.format(templates.delete, values), null, extractPgRowCount)
  }
}