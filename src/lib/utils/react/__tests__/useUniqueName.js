import { useRef } from "react"
import useUniqueName from "lib/utils/react/useUniqueName"
jest.mock(`react`, () => ({ __esModule: true, useRef: jest.fn() }))
describe(`lib/utils/react/useUniqueName`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`])).toMatchSnapshot()
  })
  afterEach(() => useRef.mockClear())
  function assert (namespaces, refs, name, output) {
    useRef.mockReturnValueOnce(refs.initial)
    expect(useUniqueName(namespaces.initial, name)).toBe(output)
    expect(useRef.mock.calls).toEqual([[null]])
    expect(refs.initial).toEqual(refs.mutated)
    expect(namespaces.initial).toEqual(namespaces.mutated)
  }
  describe(`first render`, () => {
    const msg = `should detect repeated names and setup the ref (repeated %j)`
    function makeNamespace (repeated) {
      return repeated ? { foo: null } : {}
    }
    test.each([
      [true, null],
      [false, `foo`],
    ])(msg, (repeated, output) => {
      const refs = {
        initial: { current: null },
        mutated: { current: { name: `foo`, repeated } },
      }
      const namespaces = {
        initial: makeNamespace(repeated),
        mutated: { foo: null },
      }
      assert(namespaces, refs, `foo`, output)
    })
  })
  describe(`re-render without change`, () => {
    test.each([
      [true, null],
      [false, `foo`],
    ])(`should return the stored value (repeated %j)`, (repeated, output) => {
      const refs = {
        initial: { current: { name: `foo`, repeated } },
        mutated: { current: { name: `foo`, repeated } },
      }
      const namespaces = {
        initial: { foo: null },
        mutated: { foo: null },
      }
      assert(namespaces, refs, `foo`, output)
    })
  })
  describe(`re-render with change`, () => {
    function makeNamespaces (fromRepeated, toRepeated) {
      if (fromRepeated) {
        if (toRepeated) {
          return {
            initial: { foo: null, bar: null },
            mutated: { foo: null, bar: null },
          }
        } else {
          return {
            initial: { foo: null },
            mutated: { foo: null, bar: null },
          }
        }
      } else {
        if (toRepeated) {
          return {
            initial: { foo: null, bar: null },
            mutated: { bar: null },
          }
        } else {
          return {
            initial: { foo: null },
            mutated: { bar: null },
          }
        }
      }
    }
    const msg = `should update the stored value and return (fromRepeated %j, toRepeated %j)`
    test.each([
      [true, true, null],
      [true, false, `bar`],
      [false, true, null],
      [false, false, `bar`],
    ])(msg, (fromRepeated, toRepeated, output) => {
      const refs = {
        initial: { current: { name: `foo`, repeated: fromRepeated } },
        mutated: { current: { name: `bar`, repeated: toRepeated } },
      }
      const namespaces = makeNamespaces(fromRepeated, toRepeated)
      assert(namespaces, refs, `bar`, output)
    })
  })
})