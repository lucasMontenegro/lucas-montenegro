jest.mock(`react-dom`, () => ({
  default: { render: jest.fn() },
}))
jest.mock(`new/local/app/ui/styling`, () => ({ default: `new/local/app/ui/styling` }))
jest.mock(`new/local/app/ui/throwPropTypeErrors`, () => ({ default: () => {} }))
jest.mock(`new/local/utils/globals`, () => ({
  default: {
    document: { getElementById: () => {} },
  },
}))
describe(`new/local/app/ui`, () => {
  it(`should run`, () => {
    require("new/local/app/ui")
  })
})