describe(`lib/utils/react/SetValue`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `@material-ui/core`])).toMatchSnapshot()
  })
})