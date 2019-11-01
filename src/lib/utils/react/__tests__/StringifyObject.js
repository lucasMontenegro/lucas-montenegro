describe(`lib/utils/react/StringifyObject`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `stringify-object`])).toMatchSnapshot()
  })
})