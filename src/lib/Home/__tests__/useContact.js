import { useRef } from "react"
import useContact from "../useContact"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
describe(`../useContact`, () => {
  jestUtils.describeDependencies({
    deps: [`react`],
    relativeBasePath: __dirname,
  })
  describe(`useContact`, () => {
    const scrollIntoView = jest.fn()
    let contactState
    beforeAll(() => {
      useRef.mockImplementationOnce(initialValue => ({
        initialValue,
        current: { scrollIntoView },
      }))
      contactState = useContact()
    })
    it(`should set up the contact button state`, () => {
      expect(contactState).toMatchSnapshot()
    })
    describe(`contactState.handleClick`, () => {
      it(`should scroll the contact section into view`, () => {
        contactState.handleClick()
        expect(scrollIntoView.mock.calls).toEqual([[]])
        scrollIntoView.mockClear()
      })
    })
  })
})