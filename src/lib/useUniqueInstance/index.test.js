import { useRef, useEffect } from "react"
import isProduction from "lib/utils/isProduction"
import useUniqueInstance from "lib/useUniqueInstance"
jest.mock(`react`, () => ({
  __esModule: true,
  useRef: jest.fn(),
  useEffect: jest.fn(),
}))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`lib/useUniqueInstance`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  const getName = () => `foo`
  const error = `foo: Only one instance is allowed`
  test.each([
    [true],
    [false],
  ])(`should detect unique names (isProductionValue %j)`, isProductionValue => {
    isProduction.mockReturnValue(isProductionValue)
    const makeRefs = () => ({ unique: { current: false }, name: { current: null } })
    const refs = [makeRefs(), makeRefs()]
    const effects = []
    const mock = (i, assert) => {
      useRef.mockReturnValueOnce(refs[i].unique)
      useRef.mockReturnValueOnce(refs[i].name)
      assert()
      effects[i] = useEffect.mock.calls[0][0]
      useEffect.mockClear()
    }
    const clearEffect = i => {
      effects[i]()()
      refs[i] = makeRefs()
    }
    const expectUnique = () => expect(useUniqueInstance(getName)).toBe(`foo`)
    const expectRepeated = () => {
      if (isProductionValue) {
        expect(useUniqueInstance(getName)).toBeNull()
      } else {
        expect(() => useUniqueInstance(getName)).toThrow(error)
      }
    }
    mock(0, expectUnique) // '0' starts as the unique/valid instance
    mock(1, expectRepeated)
    // simulate a re-render
    mock(0, expectUnique)
    mock(1, expectRepeated)
    // the repeated instance is destroyed and created again
    clearEffect(1)
    mock(0, expectUnique)
    mock(1, expectRepeated)
    // destroy first instance (unique)
    clearEffect(0) // now '1' is the valid instance
    mock(1, expectUnique)
    mock(0, expectRepeated)
    // cleanup the namespace for the next test
    clearEffect(1)
  })
})