import { useRoutingContext } from "lib/react/routing/context"
import React from "react"
import renderer from "react-test-renderer"
import NotFound from "./index.js"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: fn => {
    fn({
      spacing: () => {},
      palette: { text: {} },
    })
    return () => ({
      root: `classes-root`,
      content: `classes-content`,
      referrer: `classes-referrer`,
      link: `classes-link`,
    })
  },
}))
jest.mock(`lib/Translation`, () => ({
  __esModule: true,
  default: class Translation {
    get () {
      return {
        title: `translation.title`,
        error: `translation.error`,
        greeting: `translation.greeting`,
        close: `translation.close`,
        home: `translation.home`,
      }
    }
  },
}))
jest.mock(`lib/react/routing/context`, () => ({ __esModule: true, useRoutingContext: jest.fn() }))
jest.mock(`@material-ui/core/Typography`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: function Typography (props) {
      return <div {...props} />
    },
  }
})
jest.mock(`lib/react/links/Link`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: function Typography (props) {
      return <a {...props} />
    },
  }
})
describe(`./index.js`, () => {
  it(`should use the versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  describe(`<NotFound /> (no match)`, () => {
    let html
    beforeAll(() => {
      useRoutingContext.mockReturnValueOnce({
        route: { render: {} },
      })
      html = renderer.create(<NotFound />)
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
  })
  describe(`<NotFound /> (match with referrer)`, () => {
    let html
    beforeAll(() => {
      useRoutingContext.mockReturnValueOnce({
        route: {
          render: { notFound: true },
          location: { state: { pathname: `/foo`, search: `?x=1`, hash: `#abc` } },
        },
        routing: {
          translatedLocations: { notFound: { get: () => `/translated-notFound-location` } },
        },
      })
      html = renderer.create(<NotFound />)
    })
    it(`should render`, () => {
      expect(html.toJSON()).toMatchSnapshot()
    })
  })
  {
    const cases = [
      [`referrer not in location`, {
        render: { notFound: true },
        location: {},
      }],
      [`referrer set to undefined`, {
        render: { notFound: true },
        location: { state: undefined },
      }],
      [`referrer set to null`, {
        render: { notFound: true },
        location: { state: null },
      }],
    ]
    describe.each(cases)(`<NotFound /> (match without referrer, %s)`, (msg, route) => {
      let html
      beforeAll(() => {
        useRoutingContext.mockReturnValueOnce({
          route,
          routing: {
            translatedLocations: { home: { get: () => `/translated-home-location` } },
          },
        })
        html = renderer.create(<NotFound />)
      })
      it(`should render`, () => {
        expect(html.toJSON()).toMatchSnapshot()
      })
    })
  }
})