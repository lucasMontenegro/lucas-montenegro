jest.mock(`local/todo/Repo`, () => jest.fn())
const Todo = require("local/todo/Repo")
const todo = {}
Todo.mockImplementation(() => todo)
const pgp = {}
const db = {}
const extendRepos = require("local/pg/extendRepos")
describe(`local/pg/extendRepos`, () => {
  beforeAll(() => extendRepos(pgp, db, `dc`))
  it(`should add 1 repo total`, () => {
    expect(Object.values(db)).toHaveLength(1)
  })
  it.each([
    [`todo`, Todo, todo],
  ])(`should add the '%s' repo`, (name, Repo, repo) => {
    expect(Repo.mock.calls).toHaveLength(1)
    expect(Repo.mock.calls[0]).toHaveLength(2)
    expect(Repo.mock.calls[0][0]).toBe(db)
    expect(Repo.mock.calls[0][1]).toBe(pgp)
    expect(db).toHaveProperty(name, repo)
  })
})