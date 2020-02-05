import renderer from "react-test-renderer"
import React from "react"
import TabletDrawer from "../TabletDrawer"
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: (styles, options) => () => {
    const classes = styles({ spacing: n => 8*n })
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
jest.mock(`@material-ui/core/Drawer`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Drawer" /> }
})
jest.mock(`@material-ui/core/List`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="List" /> }
})
jest.mock(`@material-ui/core/Tooltip`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Tooltip" /> }
})
jest.mock(`@material-ui/core/ListItem`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => (
      <div {...props} className={`ListItem ${props.className}`} onClick={props.onClick()} />
    ),
  }
})
jest.mock(`lib/react/Dashboard`, () => ({
  __esModule: true,
  useDashboardOpener: () => () => `useDashboardOpener()`,
}))
jest.mock(`@material-ui/core/ListItemIcon`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`ListItemIcon ${props.className}`} />,
  }
})
jest.mock(`lib/react/fontAwesome`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    FontAwesomeIcon: props => <i {...props} className="FontAwesomeIcon" />,
  }
})
jest.mock(`@material-ui/core/Divider`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="Divider" /> }
})
jest.mock(`../TabletNav`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="TabletNav" /> }
})
describe(`../TabletDrawer`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  describe(`<TabletDrawer />`, () => {
    it(`should render`, () => {
      expect(renderer.create(<TabletDrawer />).toJSON()).toMatchSnapshot()
    })
  })
})