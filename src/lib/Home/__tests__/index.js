import { makeStyles } from "@material-ui/core/styles"
import React, { useRef } from "react"
import { useDarkMode } from "lib/react/DarkMode"
import Button from "@material-ui/core/Button"
import { useRoute } from "lib/react/routing/context"
import renderer from "react-test-renderer"
jest.mock(`@material-ui/core/styles`, () => ({ __esModule: true, makeStyles: jest.fn() }))
let paletteType
function mockStyles (str) {
  paletteType = str
}
makeStyles.mockImplementation((styles, options) => () => {
  const classes = styles({
    spacing: n => `theme.spacing(${n})`,
    palette: { type: paletteType },
  })
  return Object.keys(classes).reduce((classes, key) => {
    classes[key] = `${options.name}-${key}(${JSON.stringify(classes[key])})`
    return classes
  }, classes)
})
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
jest.mock(`@material-ui/core/Link`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <a {...props} /> }
})
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
jest.mock(`lib/react/DarkMode`, () => ({ __esModule: true, useDarkMode: jest.fn() }))
function mockDarkMode (value) {
  useDarkMode.mockReturnValueOnce({ value })
}
jest.mock(`lib/react/MainBar`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="MainBar" /> }
})
jest.mock(`@material-ui/core/Container`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className="Container" />,
  }
})
jest.mock(`lib/react/DocumentTitle`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: ({ value, ...other }) => <div {...other} className="DocumentTitle">{value}</div>,
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
jest.mock(`@material-ui/core/Card`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => (
      <div {...props} ref={ref} className={`Card ${props.className}`} />
    )),
  }
})
jest.mock(`lib/react/WufooForm`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="WufooForm" /> }
})
jest.mock(`lib/react/routing/context`, () => ({ __esModule: true, useRoute: jest.fn() }))
function mockUseRoute (render) {
  useRoute.mockReturnValueOnce({ render })
}
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
      mockUseRoute({})
      expect(renderer.create(<Home />).toJSON()).toBeNull()
    })
  })
  {
    const cases = [
      [true, `dark`],
      [false, `light`],
    ]
    const msg = `<Home /> (render true, is dark %j)`
    describe.each(cases)(msg, (darkModeValue, paletteType) => {
      let html
      const contactRef = React.createRef()
      beforeAll(() => {
        mockUseRoute({ home: true })
        mockDarkMode(darkModeValue)
        useRef.mockReturnValueOnce(contactRef)
        mockStyles(paletteType)
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