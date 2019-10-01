jest.mock(`cluster`, () => ({ fork: jest.fn(), on: jest.fn() }))
jest.mock(`os`, () => ({ cpus: jest.fn(() => ({ length: 2 })) }))
jest.mock(`local/startHttp`, () => jest.fn())
const mockEnv = require("local/helpers/mockEnv")
describe(`local/startProcess`, () => {
  let cluster, os, startHttp
  beforeEach(() => {
    jest.resetModules()
    cluster = require("cluster")
    os = require("os")
    startHttp = require("local/startHttp")
  })
  it(`should set up multiple processes`, () => {
    const consoleLogSpy = jest.fn()
    const mockConsoleLog = cb => {
      const consoleLog = console.log
      console.log = consoleLogSpy
      cb()
      console.log = consoleLog
    }
    cluster.isMaster = true
    mockConsoleLog(() => {
      mockEnv(`NODE_ENV`, `production`, () => require("local/startProcess"))
    })
    expect(consoleLogSpy.mock.calls).toHaveLength(1)
    expect(os.cpus.mock.calls).toEqual([[]])
    expect(cluster.fork.mock.calls).toEqual([[], []])
    expect(cluster.on.mock.calls).toHaveLength(1)
    expect(cluster.on.mock.calls[0]).toHaveLength(2)
    expect(cluster.on.mock.calls[0][0]).toBe(`exit`)
    const onExit = cluster.on.mock.calls[0][1]
    expect(onExit).toBeInstanceOf(Function)
    mockConsoleLog(() => onExit({ process: { pid: `"pid"` } }, `"code"`, `"signal"`))
    expect(consoleLogSpy.mock.calls).toHaveLength(2)
  })
  test.each([
    [`production`, false],
    [`foo`, true],
    [`foo`, false],
  ])(`should create the app (NODE_ENV %s, isMaster %j)`, (nodeEnv, isMaster) => {
    cluster.isMaster = isMaster
    mockEnv(`NODE_ENV`, nodeEnv, () => require("local/startProcess"))
    expect(os.cpus.mock.calls).toHaveLength(0)
    expect(cluster.fork.mock.calls).toHaveLength(0)
    expect(startHttp.mock.calls).toEqual([[]])
  })
})