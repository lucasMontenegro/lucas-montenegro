describe(`lib/fontAwesome/FontAwesomeIcon`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`@fortawesome/react-fontawesome`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("lib/fontAwesome/FontAwesomeIcon")
  })
})