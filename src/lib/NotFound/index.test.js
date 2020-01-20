import { useRoutingContext } from "lib/react/routing/context"
import React from "react"
import renderer from "react-test-renderer"
import NotFound from "./index.js"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const classes = styles({
      spacing: n => `theme.spacing(${n})`,
      palette: { text: { secondary: `theme.palette.text.secondary` } },
    })
    return Object.keys(classes).reduce((classes, key) => {
      classes[key] = `${options.name}-${key}(${JSON.stringify(classes[key])})`
      return classes
    }, classes)
  },
}))
jest.mock(`lib/react/useTranslation`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: () => source => (
      <div className="translation">
        {Object.keys(source).map(key => (
          <div key={key} className={key}>{source[key]()}</div>
        ))}
      </div>
    ),
  }
})
jest.mock(`@material-ui/core/Typography`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: function Typography (props) {
      return <div {...props} className={`Typography ${props.className}`} />
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
jest.mock(`lib/react/routing/context`, () => ({ __esModule: true, useRoutingContext: jest.fn() }))
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
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
      expect(html.toJSON()).toBeNull()
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
      [`referrer not in location`, {}],
      [`referrer set to undefined`, { state: undefined }],
      [`referrer set to null`, { state: null }],
    ]
    describe.each(cases)(`<NotFound /> (match without referrer, %s)`, (msg, routeLocation) => {
      let html
      beforeAll(() => {
        useRoutingContext.mockReturnValueOnce({
          route: {
            render: { notFound: true },
            location: routeLocation,
          },
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