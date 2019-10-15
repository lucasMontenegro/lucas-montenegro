describe(`new/local/app/ui/fontAwesome`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([
      `@fortawesome/fontawesome-svg-core`,
      `@fortawesome/free-brands-svg-icons`,
      `@fortawesome/free-solid-svg-icons`,
      `@fortawesome/free-regular-svg-icons`,
    ])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/app/ui/fontAwesome")
  })
})