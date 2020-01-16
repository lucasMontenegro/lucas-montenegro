describe(`lib/utils/react/CreateDestroy`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `@material-ui/core`])).toMatchSnapshot()
  })
})