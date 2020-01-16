import renderer from "react-test-renderer"
import logo from "new/local/ui/logo"
describe(`new/local/ui/logo`, () => {
  it(`should render`, () => {
    expect(renderer.create(logo).toJSON()).toMatchSnapshot()
  })
})