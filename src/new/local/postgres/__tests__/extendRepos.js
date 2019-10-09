import extendRepos from "new/local/postgres/extendRepos"
// How to test:
// jest.mock(`new/local/Repo`, () => ({
//   __esModule: true,
//   default: (...args) =>  ({ name: `Repo`, args }),
// }))
describe(`new/local/postgres/extendRepos`, () => {
  it(`should extend the repo`, () => {
    const db = {}
    const dc = {}
    extendRepos(db, dc)
    expect({ db, dc }).toMatchSnapshot()
  })
})