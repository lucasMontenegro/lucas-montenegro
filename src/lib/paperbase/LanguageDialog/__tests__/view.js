describe(`lib/paperbase/LanguageDialog/view`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `@material-ui/core`,
      `prop-types`,
      `@material-ui/styles`,
    ])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("lib/paperbase/LanguageDialog/view")
  })
})