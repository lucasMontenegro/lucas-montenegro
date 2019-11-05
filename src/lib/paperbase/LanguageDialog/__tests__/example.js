describe(`lib/paperbase/LanguageDialog/example`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `react-router-dom`,
      `@material-ui/styles`,
      `@material-ui/core`,
    ])).toMatchSnapshot()
  })
})