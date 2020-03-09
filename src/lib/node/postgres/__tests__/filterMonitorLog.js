import globals from "lib/utils/globals"
import isProduction from "lib/utils/isProduction"
import fs from "fs"
import filterMonitorLog from "../filterMonitorLog"
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: { cwd: () => `/cwd` },
    console: {},
  },
}))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`os`, () => ({
  __esModule: true,
  default: { EOL: `<EOL>` },
}))
jest.mock(`fs`, () => ({
  __esModule: true,
  default: { appendFile: jest.fn() },
}))
describe(`../filterMonitorLog`, () => {
  jestUtils.describeDependencies({
    deps: [
      `lib/utils/globals`,
      `lib/utils/isProduction`,
    ],
    relativeBasePath: __dirname,
  })
  describe(`filterMonitorLog (error event, production true)`, () => {
    it(`should not do anything`, () => {
      isProduction.mockReturnValueOnce(true)
      filterMonitorLog(`msg`, { event: `error` })
      expect(fs.appendFile.mock.calls).toEqual([])
    })
  })
  {
    const cases = [[new Date(`2020-03-09T19:42:12.837Z`)], [undefined]]
    const msg =`filterMonitorLog (error event, production false, info.time %j)`
    describe.each(cases)(msg, time => {
      let errorCallback
      beforeAll(() => {
        isProduction.mockReturnValueOnce(false)
        filterMonitorLog(`msg`, { event: `error`, time })
        try {
          errorCallback = fs.appendFile.mock.calls[0][2]
        } catch (e) {
          if (e.message !== `Cannot read property '2' of undefined`) {
            throw e
          }
        }
      })
      it(`should save the error message to the file system`, () => {
        expect(fs.appendFile.mock.calls).toMatchSnapshot()
        fs.appendFile.mockClear()
      })
      describe(`fs.appendFile error handler (error {})`, () => {
        it(`should log the error`, () => {
          const error = globals.console.error = jest.fn()
          const e = {}
          errorCallback(e)
          delete globals.console.error
          expect(error.mock.calls).toEqual([[{}]])
          expect(error.mock.calls[0][0]).toBe(e)
        })
      })
      describe.each([[null], [undefined]])(`fs.appendFile error handler (error %j)`, e => {
        it(`should not call console.error`, () => {
          const error = globals.console.error = jest.fn()
          errorCallback(e)
          delete globals.console.error
          expect(error.mock.calls).toEqual([])
        })
      })
    })
  }
  describe(`filterMonitorLog (foo event, production true)`, () => {
    it(`should hide the error message`, () => {
      const info = { event: `foo` }
      isProduction.mockReturnValueOnce(true)
      filterMonitorLog(`msg`, info)
      expect(info).toHaveProperty(`display`, false)
      expect(fs.appendFile.mock.calls).toEqual([])
    })
  })
  describe(`filterMonitorLog (foo event, production false)`, () => {
    it(`should hide the error message`, () => {
      const info = { event: `foo` }
      isProduction.mockReturnValueOnce(false)
      filterMonitorLog(`msg`, info)
      expect(info).toEqual({ event: `foo` })
      expect(fs.appendFile.mock.calls).toEqual([])
    })
  })
})