describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("./index.js")
  })
})