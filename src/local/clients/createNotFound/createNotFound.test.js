jest.mock(`react`, () => ({ ...jest.requireActual(`react`), useRef: jest.fn() }))
import React, { useRef } from "react"

jest.mock(`local/core/createBaseClient`, () => ({
  __esModule: true,
  default: jest.fn(() => `BaseClient`),
}))
import createBaseClient from "local/core/createBaseClient"

jest.mock(`./NotFoundView`, () => ({ __esModule: true, default: jest.fn() }))
import NotFoundView from "./NotFoundView"
NotFoundView.mockImplementation(function NotFoundViewSpy (props) {
  return (
    <div>
      <div>{JSON.stringify(props.hidden)}</div>
      <div>{JSON.stringify(props.referrer)}</div>
      <div>{props.languageCode}</div>
      <div>{props.clientProps.testProp}</div>
      <div>{props.routing}</div>
      <div>{props.BaseClient}</div>
    </div>
  )
})

import createNotFound from "./index"
import renderer from "react-test-renderer"
describe(`local/clients/createNotFound`, () => {
  let NotFound
  function expectToRender ({ savedNewLocation, input, output }) {
    /*
      options = {
        savedNewLocation,
        input: {
          props: { match, location },
          ref: { referrer, location },
        },
        output: {
          render: { hidden, referrer },
          ref: { referrer, location },
        },
      }
    */
    const refs = {
      input: { current: input.ref },
      output: { current: output.ref },
    }
    useRef.mockReturnValueOnce(refs.input)
    {
      const actual = (
        <NotFound
          {...input.props}
          languageCode="languageCode"
          testProp="testProp"
        />
      )
      const expected = (
        <div>
          <div>{output.render.hidden}</div>
          <div>{output.render.referrer}</div>
          <div>languageCode</div>
          <div>testProp</div>
          <div>routing</div>
          <div>BaseClient</div>
        </div>
      )
      expect(renderer.create(actual).toJSON()).toEqual(renderer.create(expected).toJSON())
    }
    expect(refs.input).toEqual(refs.output)
    if (savedNewLocation) {
     expect(output.ref.location).toBe(input.props.location)
    } else {
     expect(output.ref.location).toBe(input.ref.location)
    }
    expect(useRef.mock.calls).toEqual([[{ referrer: null, location: null }]])
    useRef.mockClear()
  }
  it(`should create the component`, () => {
    NotFound = createNotFound({
      appName: `appName`,
      initialLocation: `initialLocation`,
      linkTranslators: `linkTranslators`,
      routing: `routing`,
    })
    expect(createBaseClient.mock.calls).toEqual([[{
      appName: `appName`,
      clientName: `notFound`,
      initialLocation: `initialLocation`,
      linkTranslators: `linkTranslators`,
    }]])
    expect(NotFound).toBeInstanceOf(Function)
    expect(NotFound.name).toBe(`NotFound`)
  })
  describe(`error message`, () => {
    const hidden = `false` // never hidden
    it(`should render (updating the referrer)`, () => {
      const location = { state: { pathname: `/foo`, search: `?bar`, hash: `#baz` } }
      expectToRender({
        savedNewLocation: true,
        input: {
          props: { match: true, location },
          ref: { referrer: null, location: {} }, // pass a different location to trigger an update
        },
        output: {
          render: { hidden, referrer: `"/foo?bar#baz"` },
          ref: { referrer: `/foo?bar#baz`, location },
        },
      })
    })
    it(`should render without updating`, () => {
      const location = {}
      ;[
        { match: true, locationProp: location }, // pass the same location to avoid updates
        { match: false, locationProp: location },
        { match: false, locationProp: {} },
      ].map(({ match, locationProp }) => ({
        savedNewLocation: false,
        input: {
          props: { match, location: locationProp },
          ref: { referrer: `referrer`, location },
        },
        output: {
          render: { hidden, referrer: `"referrer"` },
          ref: { referrer: `referrer`, location },
        },
      })).forEach(expectToRender)
    })
  })
  describe(`default message`, () => {
    it(`should render (updating the referrer)`, () => {
      const location = {}
      expectToRender({
        savedNewLocation: true,
        input: {
          props: { match: true, location },
          ref: { referrer: `referrer`, location: {} }, // trigger update
        },
        output: {
          render: { hidden: `false`, referrer: `null` },
          ref: { referrer: null, location },
        },
      })
    })
    it(`should render without updating`, () => {
      const location = {}
      ;[
        { match: true, locationProp: location, hidden: `false` },
        { match: false, locationProp: location, hidden: `true` },
        { match: false, locationProp: {}, hidden: `true` },
      ].map(({ match, locationProp, hidden }) => ({
        savedNewLocation: false,
        input: {
          props: { match, location: locationProp },
          ref: { referrer: null, location },
        },
        output: {
          render: { hidden, referrer: `null` },
          ref: { referrer: null, location },
        },
      })).forEach(expectToRender)
    })
  })
})