jest.mock(`os`, () => ({ EOL: `EOL` }))
jest.mock(`fs`, () => ({ appendFile: jest.fn() }))
const fs = require("fs")
const saveLog = require("local/pg/saveLog")
const mockEnv = require("local/helpers/mockEnv")
describe(`local/pg/saveLog`, () => {
  const msg = (
    `NODE_ENV %s | info.event %s | info.time %j => ` +
    `info.display %j | calls.length %d | calls[0][1] %s`
  )
  test.each([
    [`production`,  `error`,   true,  false, 1, `EOLEOLmsg`],
    [`production`,  `error`,   false, false, 1, `EOLmsg`   ],
    [`production`,  `noError`, true,  false, 0, `-`        ],
    [`production`,  `noError`, false, false, 0, `-`        ],
    [`development`, `error`,   true,  true,  1, `EOLEOLmsg`],
    [`development`, `error`,   false, true,  1, `EOLmsg`   ],
    [`development`, `noError`, true,  true,  0, `-`        ],
    [`development`, `noError`, false, true,  0, `-`        ],
  ])(msg, (nodeEnv, event, time, display, callsLength, text) => {
    const info = { event, time, display: true }
    mockEnv(`NODE_ENV`, nodeEnv, () => saveLog()(`msg`, info))
    expect(info.display).toBe(display)
      const { calls } = fs.appendFile.mock
    expect(calls).toHaveLength(callsLength)
    if (callsLength === 1) {
      expect(calls[0]).toHaveLength(3)
      const logFile = calls[0][0]
      expect(logFile).toMatch(/\/pg-errors\.log$/)
      {
        const str = __dirname.slice(0, -`/nodePath/local/pg/__tests__`.length)
        expect(logFile.slice(0, -`/pg-errors.log`.length)).toBe(str)
      }
      expect(calls[0][1]).toBe(text)
    }
    fs.appendFile.mockClear()
  })
})