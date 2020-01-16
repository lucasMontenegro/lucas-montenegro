describe(`lib/fontAwesome/setup`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([
      `@fortawesome/fontawesome-svg-core`,
      `@fortawesome/free-brands-svg-icons`,
      `@fortawesome/free-solid-svg-icons`,
      `@fortawesome/free-regular-svg-icons`,
    ])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("lib/fontAwesome/setup")
  })
})