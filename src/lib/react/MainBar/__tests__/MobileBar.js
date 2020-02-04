import renderer from "react-test-renderer"
import React from "react"
import MobileBar from "../MobileBar"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const classes = styles({
      palette: {
        text: { primary: `theme.palette.text.primary` },
        background: { paper: `theme.palette.background.paper` },
      },
      spacing: n => 8*n,
    })
    return Object.keys(classes).reduce((obj, key) => {
      obj[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
      return obj
    }, {})
  },
}))
jest.mock(`lib/react/useTranslation`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: () => source => (
      <div className="translation">
        {Object.keys(source).map(languageCode => (
          <div key={languageCode} className={languageCode}>{source[languageCode]()}</div>
        ))}
      </div>
    ),
  }
})
jest.mock(`../useMobileNav`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: t => ({
      open: () => `useMobileNav().open()`,
      node: (
        <div className="MobileNav">
          {t({
            en: () => `EN MobileNav`,
            es: () => `ES MobileNav`,
          })}
        </div>
      ),
    }),
  }
})
jest.mock(`@material-ui/core/AppBar`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`AppBar ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/Toolbar`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`Toolbar ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/Tooltip`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Tooltip" /> }
})
jest.mock(`@material-ui/core/IconButton`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => (
      <div {...props} className={`IconButton ${props.className}`} onClick={props.onClick()} />
    ),
  }
})
jest.mock(`lib/react/AppDrawer`, () => ({
  __esModule: true,
  useAppDrawerOpener: () => () => `useAppDrawerOpener()()`,
}))
jest.mock(`lib/react/fontAwesome`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    FontAwesomeIcon: props => <i {...props} className="FontAwesomeIcon" />,
  }
})
describe(`../MobileBar`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  describe(`<MobileBar />`, () => {
    it(`should render`, () => {
      expect(renderer.create(<MobileBar />).toJSON()).toMatchSnapshot()
    })
  })
})