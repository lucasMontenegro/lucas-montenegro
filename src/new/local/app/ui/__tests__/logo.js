import renderer from "react-test-renderer"
import logo from "new/local/app/ui/logo"
describe(`new/local/app/ui/logo`, () => {
  it(`should render`, () => {
    expect(renderer.create(logo).toJSON()).toMatchSnapshot()
  })
})