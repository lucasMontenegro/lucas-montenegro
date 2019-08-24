import React from "react"
import renderer from "react-test-renderer"
import { createRedPortal, createBluePortal } from "./index"
import makeUniqueRef from "./makeUniqueRef"
jest.mock("react-dom", () => ({
  __esModule: true,
  default: {
    createPortal (children) {
      return children
    },
  },
}))
jest.mock("./makeUniqueRef.js", () => ({
  __esModule: true,
  default: jest.fn(),
}))
const useUniqueRef = jest.fn()
makeUniqueRef.mockReturnValue(useUniqueRef)
describe(`local/core/portals`, () => {
  describe(`createBluePortal`, () => {
    it(`should detect repeated names`, () => {
      const name = `Repeated`
      expect(() => createBluePortal(name)).not.toThrow()
      expect(() => createBluePortal(name)).toThrow()
    })
    it(`should detect repeated instances`, () => {
      useUniqueRef.mockReturnValueOnce(true).mockReturnValueOnce(false)
      const BluePortal = createBluePortal(`ExampleBluePortal`)
      const node = <BluePortal>Example BluePortal</BluePortal>
      expect(renderer.create(node).toJSON()).toBe(`Example BluePortal`)
      expect(renderer.create(node).toJSON()).toBeNull()
    })
  })
  describe(`createRedPortal`, () => {
    it(`should detect repeated names`, () => {
      const name = `Repeated`
      expect(() => createRedPortal(name)).not.toThrow()
      expect(() => createRedPortal(name)).toThrow()
    })
    it(`should detect repeated instances`, () => {
      useUniqueRef.mockReturnValueOnce(true).mockReturnValueOnce(false)
      const RedPortal = createRedPortal(`ExampleRedPortal`)
      const node = <RedPortal Component="div" props={{ id: `red-portal` }} />
      expect(renderer.create(node).toJSON()).toEqual({
        type: 'div',
        props: { id: 'red-portal' },
        children: null,
      })
      expect(renderer.create(node).toJSON()).toBeNull()
    })
  })
})