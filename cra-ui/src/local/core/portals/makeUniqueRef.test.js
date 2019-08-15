import * as react from "react"
import makeUniqueRef from "./makeUniqueRef"
jest.mock("react", () => ({
  __esModule: true,
  useRef: jest.fn(),
  useEffect: jest.fn(),
}))
react.useEffect.mockImplementation(() => {})
react.useRef.mockImplementation(current => ({ current }))
const mockNodeEnv = (value, cb) => {
  const savedValue = process.env.NODE_ENV
  process.env.NODE_ENV = value
  cb()
  process.env.NODE_ENV = savedValue
}
describe(`local/core/portals/makeUniqueRef`, () => {
  it(`should throw in development`, () => {
    mockNodeEnv(`development`, () => {
      const useUniqueRef = makeUniqueRef(`developmentExample`)
      expect(useUniqueRef()).toBe(true)
      expect(useUniqueRef).toThrow(`developmentExample: Only one instance is allowed`)
    })
  })
  it(`should not throw in production`, () => {
    mockNodeEnv(`production`, () => {
      const useUniqueRef = makeUniqueRef(`productionExample`)
      expect(useUniqueRef()).toBe(true)
      expect(useUniqueRef()).toBe(false)
    })
  })
  it(`should not throw when production is forced`, () => {
    mockNodeEnv(`development`, () => {
      const useUniqueRef = makeUniqueRef(`forcedProductionExample`, `production`)
      expect(useUniqueRef()).toBe(true)
      expect(useUniqueRef()).toBe(false)
    })
  })
})