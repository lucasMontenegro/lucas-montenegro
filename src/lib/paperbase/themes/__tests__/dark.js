describe(`lib/paperbase/themes/dark`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("lib/paperbase/themes/dark")
  })
})