import React from "react"
import renderer from "react-test-renderer"
import OldExamples from "new/local/app/ui/Routes/OldExamples"
describe(`new/local/app/ui/Routes/OldExamples`, () => {
  it(`should render`, () => {
    renderer.create(<OldExamples />)
  })
})