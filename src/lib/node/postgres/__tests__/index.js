jest.mock(`bluebird`, () => ({ __esModule: true, default: {} }))
jest.mock(`../errorFiltering`, () => ({
  __esModule: true,
  errorLogger () {},
  addIgnoredError () {},
}))
jest.mock(`../extendRepo`, () => ({ __esModule: true, default: () => {} }))
jest.mock(`pg-promise`, () => ({
  __esModule: true,
  default: () => {
    const pgp = () => ({})
    pgp.end = () => {}
    return pgp
  },
}))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: {
      env: {
        PG_HOST: `globals.process.env.PG_HOST`,
        PG_DATABASE: `globals.process.env.PG_DATABASE`,
        PG_USER: `globals.process.env.PG_USER`,
        PG_PASSWORD: `globals.process.env.PG_PASSWORD`,
      },
    },
  },
}))
jest.mock(`pg-monitor`, () => ({
  __esModule: true,
  default: {
    setTheme () {},
    setLog () {},
    attach: jest.fn(),
  },
}))
jest.mock(`../filterMonitorLog`, () => ({ __esModule: true, default: () => {} }))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../index.js`, () => {
  jestUtils.describeDependencies({
    deps: [
      `bluebird`,
      `../errorFiltering`,
      `../extendRepo`,
      `pg-promise`,
      `lib/utils/globals`,
      `pg-monitor`,
      `../filterMonitorLog`,
      `lib/utils/isProduction`,
    ],
    relativeBasePath: __dirname,
  })
  describe.each([[true], [false]])(`require("../index.js") (production %j)`, production => {
    let monitor, closeDb
    beforeAll(() => {
      monitor = require("pg-monitor").default
      require("lib/utils/isProduction").default.mockReturnValueOnce(production)
      ;({ closeDb } = require("../index.js"))
      jest.resetModules()
    })
    it(`should initialize pg-monitor`, () => {
      expect(monitor.attach.mock.calls[0][1]).toMatchSnapshot()
    })
    describe(`closeDb`, () => {
      it(`should run`, () => {
        closeDb()
      })
    })
  })
})