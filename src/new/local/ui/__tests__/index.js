jest.mock(`react-dom`, () => ({
  __esModule: true,
  default: { render: jest.fn() },
}))
jest.mock(`new/local/ui/styling`, () => ({
  __esModule: true,
  default: `new/local/ui/styling`,
}))
jest.mock(`new/local/ui/throwPropTypeErrors`, () => ({ __esModule: true, default: () => {} }))
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: {
    document: { getElementById: () => {} },
  },
}))
describe(`new/local/ui`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`react-dom`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/ui")
  })
})