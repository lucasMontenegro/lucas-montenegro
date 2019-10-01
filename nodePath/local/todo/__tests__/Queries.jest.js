const pgp = require("local/jestHelpers/pgpInstance")
const Queries = require("local/todo/Queries")
describe(`local/todo/Queries`, () => {
  let queries
  beforeAll(() => {
    queries = new Queries(pgp)
  })
  test.each([
    [
      `create`,
      [`user`, `different description`, `low`],
      `INSERT INTO todo(user_id,description,priority)` +
      `VALUES('user','different description','low')`,
    ],
    [
      `read`,
      `user`,
      `SELECT todo_id,description,priority,status,created_on,updated_on ` +
      `FROM todo WHERE user_id='user'`,
    ],
    [
      `update`,
      [`user`, `14`, `high`, `pending`],
      `UPDATE todo ` +
      `SET priority='high',status='pending',updated_on=NOW()` +
      `WHERE user_id='user' AND todo_id='14'`,
    ],
    [
      `delete`,
      [`user`, `8`],
      `DELETE FROM todo ` +
      `WHERE user_id='user' AND todo_id='8'`,
    ],
  ])(`queries.render("%s", %j)`, (method, values, expected) => {
    expect(queries.render(method, values)).toBe(expected)
  })
})