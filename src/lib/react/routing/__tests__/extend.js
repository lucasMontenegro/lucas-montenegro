import routing from "../routingExample"
jest.mock(`lib/Translation`, () => ({
  __esModule: true,
  default: class Translation {
    constructor (value) {
      this.value = value
    }
  },
}))
describe(`../extend`, () => {
  it(`should create routing.translatedLocations`, () => {
    expect(routing.translatedLocations).toMatchSnapshot()
  })
})