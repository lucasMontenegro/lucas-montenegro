import { makeStyles } from "@material-ui/core/styles"
import React, { useRef } from "react"
import Translation from "lib/Translation"
import { useDarkMode } from "lib/react/DarkMode"
import { useRoute } from "lib/react/routing/context"
import Button from "@material-ui/core/Button"
import renderer from "react-test-renderer"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles (styles, options) {
    const classes = Object.keys(styles({ spacing () {} })).reduce((classes, key) => {
      classes[key] = `${options.name}-${key}`
      return classes
    }, {})
    return () => classes
  },
}))
jest.mock(`react`, () => {
  const actual = jest.requireActual("react")
  return {
    ...actual,
    __esModule: true,
    default: actual,
    useRef: jest.fn(),
  }
})
jest.mock(`@material-ui/core/Typography`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="Typography" />,
  }
})
jest.mock(`@material-ui/core/Toolbar`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`Toolbar ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/Button`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: jest.fn(props => <button {...props} />) }
})
jest.mock(`@material-ui/core/Link`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <a {...props} /> }
})
jest.mock(`lib/Translation`, () => ({ __esModule: true, default: jest.fn() }))
let currentLanguage
Translation.mockImplementation(source => ({
  get: () => source[currentLanguage]
}))
jest.mock(`lib/react/DarkMode`, () => ({ __esModule: true, useDarkMode: jest.fn() }))
jest.mock(`lib/react/routing/context`, () => ({ __esModule: true, useRoute: jest.fn() }))
jest.mock(`@material-ui/core/Container`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="Container" />,
  }
})
jest.mock(`../SvgImage`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="SvgImage" /> }
})
jest.mock(`../svg`, () => ({
  __esModule: true,
  default: {
    onlineProfile: `svg.onlineProfile`,
    technologies: `svg.technologies`,
    website: `svg.website`,
  },
}))
describe(`../index.js`, () => {
  let Home
  beforeAll(() => {
    Home = require("../index.js").default
  })
  it(`should use the right verions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  describe(`<Home /> (render false)`, () => {
    it(`should render`, () => {
      useRoute.mockReturnValueOnce({ render: {} })
      expect(renderer.create(<Home />).toJSON()).toBeNull()
    })
  })
  {
    const cases = [
      [true, `en`],
      [false, `en`],
      [true, `es`],
      [false, `es`],
    ]
    describe.each(cases)(`<Home /> (render true, is dark %j, language %j)`, (dark, language) => {
      let html
      const contactRef = React.createRef()
      beforeAll(() => {
        useDarkMode.mockReturnValueOnce({ value: dark })
        useRoute.mockReturnValueOnce({ render: { home: true } })
        currentLanguage = language
        useRef.mockReturnValueOnce(contactRef)
        html = renderer.create(<Home />)
      })
      it(`should render`, () => {
        expect(html.toJSON()).toMatchSnapshot()
      })
      describe(`call to action button handler`, () => {
        it(`should run`, () => {
          contactRef.current = { scrollIntoView () {} }
          Button.mock.calls[0][0].onClick()
          Button.mockClear()
        })
      })
    })
  }
})