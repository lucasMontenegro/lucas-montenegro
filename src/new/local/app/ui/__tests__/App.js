import createApp from "new/local/paperbase/createApp"
import routing from "new/local/app/routing"
import logo from "new/local/app/ui/logo"
import home from "new/local/home"
import notFound from "new/local/notFound"
jest.mock(`new/local/paperbase/createApp`, () => ({ __esModule: true, default: () => {} }))
jest.mock(`new/local/app/routing`, () => ({
  __esModule: true,
  default: `new/local/app/routing`,
}))
jest.mock(`new/local/app/ui/logo`, () => ({ __esModule: true, default: `new/local/app/ui/logo` }))
jest.mock(`new/local/home`, () => ({ __esModule: true, default: () => `new/local/home` }))
jest.mock(`new/local/notFound`, () => ({ __esModule: true, default: () => `new/local/notFound` }))
describe(`new/local/app/ui/App`, () => {
  it(`should run`, () => {
    require("new/local/app/ui/App")
  })
})