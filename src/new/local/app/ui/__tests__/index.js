jest.mock(`react-dom`, () => ({
  __esModule: true,
  default: { render: jest.fn() },
}))
jest.mock(`new/local/app/ui/styling`, () => ({
  __esModule: true,
  default: `new/local/app/ui/styling`,
}))
jest.mock(`new/local/app/ui/throwPropTypeErrors`, () => ({ __esModule: true, default: () => {} }))
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: {
    document: { getElementById: () => {} },
  },
}))
describe(`new/local/app/ui`, () => {
  it(`should run`, () => {
    require("new/local/app/ui")
  })
})