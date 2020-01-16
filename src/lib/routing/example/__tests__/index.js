describe(`lib/routing/example`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `react-router-dom`])).toMatchSnapshot()
  })
})