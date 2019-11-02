import React from "react"
import Link from "lib/links/ReactRouterLink"
describe(`lib/links/ReactRouterLink`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `react-router-dom`, `@material-ui/core`]))
      .toMatchSnapshot()
  })
  it(`should run`, () => {
    <Link to="/somewhere">somewhere</Link>
  })
})