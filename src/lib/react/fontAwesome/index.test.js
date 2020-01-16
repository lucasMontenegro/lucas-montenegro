describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `@fortawesome/fontawesome-svg-core`,
      `@fortawesome/free-brands-svg-icons`,
      `@fortawesome/free-solid-svg-icons`,
      `@fortawesome/free-regular-svg-icons`,
      `@fortawesome/react-fontawesome`,
    ])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("./index.js")
  })
})