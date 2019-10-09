import cartesianProduct from "new/local/utils/cartesianProduct"
describe(`new/local/utils/cartesianProduct`, () => {
  it(`should throw when an empty set is found`, () => {
    expect(() => cartesianProduct([[1, 2], [], [`A`, `B`]]))
      .toThrow(`Expected non-empty array in collection`)
  })
  it(`should calculate the cartesian product`, () => {
    expect(cartesianProduct([[1, 2], [true, false], [`A`, `B`, `C`]]))
      .toEqual([
        [1, true, `A`],
        [1, true, `B`],
        [1, true, `C`],
        [1, false, `A`],
        [1, false, `B`],
        [1, false, `C`],
        [2, true, `A`],
        [2, true, `B`],
        [2, true, `C`],
        [2, false, `A`],
        [2, false, `B`],
        [2, false, `C`],
      ])
  })
})