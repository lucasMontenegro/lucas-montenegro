const Queries = require("local/todo/Queries")
module.exports = class TodoRepo {
  constructor(db, pgp) {
    this.db = db
    this.queries = new Queries(pgp)
  }
  async create (values) {
    return this.db.none(this.queries.render(`create`, values))
  }
  async read (user_id) {
    return this.db.any(this.queries.render(`read`, user_id))
  }
  async update (values) {
    return this.db.none(this.queries.render(`update`, values))
  }
  async delete (values) {
    return this.db.result(this.queries.render(`delete`, values), null, r => r.rowCount)
  }
}