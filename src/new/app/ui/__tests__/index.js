jest.mock(`react-dom`, () => ({
  __esModule: true,
  default: { render: jest.fn() },
}))
jest.mock(`new/app/ui/styling`, () => ({
  __esModule: true,
  default: `new/app/ui/styling`,
}))
jest.mock(`new/app/ui/throwPropTypeErrors`, () => ({
  __esModule: true,
  default: () => {},
}))
jest.mock(`global`, () => ({
  __esModule: true,
  default: { document: { getElementById: () => {} } },
}))
describe(`new/app/ui`, () => {
  it(`should run`, () => {
    require("new/app/ui")
  })
})