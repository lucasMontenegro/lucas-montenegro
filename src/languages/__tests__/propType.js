describe(`languages/propType`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`prop-types`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("languages/propType")
  })
})