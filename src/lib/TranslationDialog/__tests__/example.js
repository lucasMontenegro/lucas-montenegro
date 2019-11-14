describe(`lib/TranslationDialog/example`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([
      `@material-ui/core`,
      `react`,
      `@material-ui/styles`,
      `react-router-dom`,
    ])).toMatchSnapshot()
  })
})