const Todo = require("local/todo/Repo")
module.exports = function extendRepos (pgp, db, dc) {
  db.todo = new Todo(db, pgp)
}