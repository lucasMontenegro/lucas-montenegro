import isProduction from "lib/utils/isProduction"
import cluster from "cluster"
import globals from "lib/utils/globals"
import os from "os"
import startCluster from "./index.js"
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`cluster`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: {} }))
jest.mock(`os`, () => ({ __esModule: true, default: {} }))
describe(`./index.js`, () => {
  {
    const cases = [
      [false, false],
      [false, true],
      [true, false],
    ]
    const msg = `startCluster(cb) (isProduction => %j, cluster.isMaster === %j)`
    describe.each(cases)(msg, (production, clusterIsMaster) => {
      it(`should run the callback function`, () => {
        isProduction.mockReturnValueOnce(production)
        cluster.isMaster = clusterIsMaster
        const cb = jest.fn()
        startCluster(cb)
        expect(cb.mock.calls).toEqual([[]])
        cb.mockClear()
      })
    })
  }
  describe(`startCluster(cb) (isProduction => true, cluster.isMaster === true)`, () => {
    const cb = jest.fn()
    const clusterFn = jest.fn()
    const log = jest.fn()
    let onExit
    beforeAll(() => {
      isProduction.mockReturnValueOnce(true)
      cluster.isMaster = true
      cluster.fork = (...args) => clusterFn(`cluster.fork`, args)
      cluster.on = jest.fn((...args) => clusterFn(`cluster.on`, args))
      globals.console = { log }
      globals.process = { pid: `'globals.process.pid'` }
      os.cpus = () => ({ length: 2 })
      startCluster(cb)
      try {
        onExit = cluster.on.mock.calls[0][1]
      } catch (e) {}
    })
    it(`should not run the callback function`, () => {
      expect(cb.mock.calls).toEqual([])
    })
    it(`should log a message`, () => {
      expect(log.mock.calls).toEqual([[`Node cluster master 'globals.process.pid' is running`]])
      log.mockClear()
    })
    it(`should set up the cluster`, () => {
      expect(clusterFn.mock.calls).toMatchSnapshot()
      clusterFn.mockClear()
    })
    describe(`cluster.on('exit')`, () => {
      it(`should log a message`, () => {
        onExit({ process: { pid: `'worker.process.pid'` } }, `'code'`, `'signal'`)
        expect(log.mock.calls).toEqual([[
          `Node cluster worker 'worker.process.pid' exited: code 'code', signal 'signal'`
        ]])
        log.mockClear()
      })
    })
  })
})