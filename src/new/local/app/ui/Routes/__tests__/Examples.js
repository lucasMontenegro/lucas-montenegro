import React from "react"
import renderer from "react-test-renderer"
import Examples from "new/local/app/ui/Routes/Examples"
describe(`new/local/app/ui/Routes/Examples`, () => {
  it(`should render`, () => {
    renderer.create(<Examples />)
  })
})