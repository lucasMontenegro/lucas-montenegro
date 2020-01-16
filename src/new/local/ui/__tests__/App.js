import createApp from "new/local/paperbase/createApp"
import routing from "new/local/ui/routing"
import logo from "new/local/ui/logo"
import home from "new/local/home"
import notFound from "new/local/notFound"
jest.mock(`new/local/paperbase/createApp`, () => ({ __esModule: true, default: () => {} }))
jest.mock(`new/local/ui/routing`, () => ({
  __esModule: true,
  default: `new/local/ui/routing`,
}))
jest.mock(`new/local/ui/logo`, () => ({ __esModule: true, default: `new/local/ui/logo` }))
jest.mock(`new/local/home`, () => ({ __esModule: true, default: () => `new/local/home` }))
jest.mock(`new/local/notFound`, () => ({ __esModule: true, default: () => `new/local/notFound` }))
describe(`new/local/ui/App`, () => {
  it(`should run`, () => {
    require("new/local/ui/App")
  })
})