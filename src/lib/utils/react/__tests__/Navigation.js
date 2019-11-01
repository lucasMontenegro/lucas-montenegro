describe(`lib/utils/react/Navigation`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `react-router-dom`, `@material-ui/core`]))
      .toMatchSnapshot()
  })
})