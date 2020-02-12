import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import Link from "lib/react/links/Link"
import renderer from "react-test-renderer"
jest.mock(`@material-ui/core/styles`, () => ({ __esModule: true, makeStyles: jest.fn() }))
let paletteType
makeStyles.mockImplementation((styles, options) => () => {
  const classes = styles({
    spacing: n => 8*n,
    palette: {
      text: { primary: `theme.palette.text.primary` },
      background: { paper: `theme.palette.background.paper` },
      primary: { main: `theme.palette.primary.main` },
      type: paletteType,
    },
  })
  return Object.keys(classes).reduce((obj, key) => {
    obj[key] = `${options.name}-${key}(${JSON.stringify(classes[key]).replace(/"/gm, `'`)})`
    return obj
  }, {})
})
function mockPaletteType (mode) {
  paletteType = mode
}
jest.mock(`react`, () => {
  const React = jest.requireActual("react")
  return {
    ...React,
    __esModule: true,
    default: React,
    useState: jest.fn(),
  }
})
jest.mock(`@material-ui/core/Drawer`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(props => <div {...props} className="Drawer" />),
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
    default: jest.fn(props => <button {...props} className={`IconButton ${props.className}`} />),
  }
})
jest.mock(`lib/react/fontAwesome`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    FontAwesomeIcon: props => <i {...props} className="FontAwesomeIcon" />,
  }
})
jest.mock(`@material-ui/core/List`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <ul {...props} className="List" /> }
})
jest.mock(`lib/react/routing/context`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    useRoutingContext: () => ({
      clientLinks: [
        {
          clientName: `foo`,
          active: false,
          render: {
            text: {
              en: () => `EN Foo`,
              es: () => `ES Foo`,
            },
            Icon: props => props.t({
              en: () => <i>EN Foo Icon</i>,
              es: () => <i>ES Foo Icon</i>,
            }),
          },
          location: { pathname: `/foo` },
        },
        {
          clientName: `bar`,
          active: true,
          render: {
            text: {
              en: () => `EN Bar`,
              es: () => `ES Bar`,
            },
            Icon: props => props.t({
              en: () => <i>EN Bar Icon</i>,
              es: () => <i>ES Bar Icon</i>,
            }),
          },
          location: { pathname: `/bar` },
        },
        {
          clientName: `baz`,
          active: false,
          render: {
            text: {
              en: () => `EN Baz`,
              es: () => `ES Baz`,
            },
            Icon: props => props.t({
              en: () => <i>EN Baz Icon</i>,
              es: () => <i>ES Baz Icon</i>,
            }),
          },
          location: { pathname: `/baz` },
        },
      ],
    }),
  }
})
jest.mock(`lib/react/links/Link`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: jest.fn(props => <a {...props} className={`Link ${props.className}`} />),
  }
})
jest.mock(`@material-ui/core/ListItem`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="ListItem" /> }
})
jest.mock(`@material-ui/core/ListItemIcon`, () => {
  const React = jest.requireActual("react")
  return {
    __esModule: true,
    default: props => <div {...props} className={`ListItemIcon ${props.className}`} />,
  }
})
jest.mock(`@material-ui/core/ListItemText`, () => {
  const React = jest.requireActual("react")
  return { __esModule: true, default: props => <div {...props} className="ListItemText" /> }
})
describe(`../TabletNav`, () => {
  let useMobileNav
  beforeAll(() => {
    useMobileNav = require("../useMobileNav").default
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`@material-ui/core`, `react`])).toMatchSnapshot()
  })
  {
    const cases = [
      [`light`, true],
      [`dark`, true],
      [`light`, false],
      [`dark`, false],
    ]
    describe.each(cases)(`<TabletNav /> (%s mode, is drawer open %j)`, (mode, isOpen) => {
      const setOpenTo = jest.fn()
      let mobileNav, html, onClose
      beforeAll(() => {
        useState.mockReturnValueOnce([isOpen, setOpenTo])
        mockPaletteType(mode)
        function t (source) {
          return (
            <div className="translation">
              {Object.keys(source).map(languageCode => (
                <div key={languageCode} className={languageCode}>{source[languageCode]()}</div>
              ))}
            </div>
          )
        }
        mobileNav = useMobileNav(t)
        html = renderer.create(mobileNav.node)
        try {
          ({ onClose } = Drawer.mock.calls[0][0])
        } catch (e) {}
      })
      it(`should render`, () => {
        expect(html.toJSON()).toMatchSnapshot()
      })
      it(`should expose a drawer opening function`, () => {
        expect(mobileNav.open).toBeInstanceOf(Function)
      })
      describe(`mobileNav.open`, () => {
        it(`should set the value to true`, () => {
          mobileNav.open()
          expect(setOpenTo.mock.calls).toEqual([[true]])
          setOpenTo.mockClear()
        })
      })
      it(`should set up a drawer onClose handler`, () => {
        expect(Drawer.mock.calls).toHaveProperty([0, 0, `onClose`])
        expect(Drawer.mock.calls[0][0].onClose).toBe(onClose)
        Drawer.mockClear()
      })
      it(`should set up link onClick handlers`, () => {
        expect(Link.mock.calls).toHaveLength(3)
        Link.mock.calls.forEach((call, i) => {
          expect(call).toHaveProperty([0, `onClick`])
          expect(call[0].onClick).toBe(onClose)
        })
        Link.mockClear()
      })
      it(`should set up an IconButton onClick handler`, () => {
        expect(IconButton.mock.calls).toHaveLength(1)
        expect(IconButton.mock.calls).toHaveProperty([0, 0, `onClick`])
        expect(IconButton.mock.calls[0][0].onClick).toBe(onClose)
        IconButton.mockClear()
      })
      describe(`Drawer onClose handler`, () => {
        it(`should be a function`, () => {
          expect(onClose).toBeInstanceOf(Function)
        })
        it(`should set the value to false`, () => {
          onClose()
          expect(setOpenTo.mock.calls).toEqual([[false]])
          setOpenTo.mockClear()
        })
      })
    })
  }
})