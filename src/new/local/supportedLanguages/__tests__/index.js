describe(`new/local/supportedLanguages`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`prop-types`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/supportedLanguages")
  })
})