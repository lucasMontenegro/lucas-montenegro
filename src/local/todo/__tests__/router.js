describe(`local/todo/router`, () => {
  it(`should run`, () => {
    process.env.AUTH0_DOMAIN = `https://lucas-montenegro.auth0.com`
    process.env.LUCAS_MONTENEGRO_DOMAIN = `https://lucasmontenegro.com.ar`
    require("local/todo/router")
    delete process.env.AUTH0_DOMAIN
    delete process.env.LUCAS_MONTENEGRO_DOMAIN
  })
})