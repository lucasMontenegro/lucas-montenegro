jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: {
      env: {
        AUTH0_DOMAIN: `https://lucas-montenegro.auth0.com`,
        LUCAS_MONTENEGRO_DOMAIN: `https://lucasmontenegro.com.ar`,
      },
    },
  },
}))
jest.mock(`new/local/todo/validators`, () => ({
  __esModule: true,
  default: [`post`, `put`, `delete`].reduce((obj, name) => {
    obj[name] = () => {}
    return obj
  }, {}),
}))
jest.mock(`new/local/todo/requestHandlers`, () => ({
  __esModule: true,
  default: [`post`, `get`, `put`, `delete`].reduce((obj, name) => {
    obj[name] = () => {}
    return obj
  }, {}),
}))
describe(`new/local/todo/router`, () => {
  it(`should run`, () => {
    require("new/local/todo/router")
  })
})