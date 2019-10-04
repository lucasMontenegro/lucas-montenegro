const Todo = require("local/todo/Repo")
module.exports = function extendRepos (db, dc) {
  db.todo = new Todo(db, dc)
}