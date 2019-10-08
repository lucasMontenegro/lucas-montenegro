// How to test:
// jest.mock(`new/local/Repo`, () => ({
//   default: (...args) =>  ({ name: `Repo`, args }),
// }))
const { default: extendRepos } = require("new/local/postgres/extendRepos")
describe(`new/local/postgres/extendRepos`, () => {
  it(`should extend the repo`, () => {
    const db = {}
    const dc = {}
    extendRepos(db, dc)
    expect({ db, dc }).toMatchSnapshot()
  })
})