import React, { useState } from "react"

import DialogContent from "@material-ui/core/DialogContent"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Link from "lib/links/ReactRouterLink"

import Dialog from "@material-ui/core/Dialog"

import TranslationDialog from "lib/TranslationDialog"
import renderer from "react-test-renderer"

jest.mock(`lib/Translation`, () => ({
  __esModule: true,
  default: function () {
    this.get = () => ({})
  },
}))
jest.mock(`@material-ui/core/styles`, () => ({
  __esModule: true,
  makeStyles: () => () => ({}),
}))
jest.mock(`react`, () => {
  const react = jest.requireActual(`react`)
  return {
    ...react,
    __esModule: true,
    default: react,
    useState: jest.fn(),
  }
})
let isOpenValue
useState.mockImplementation(() => [isOpenValue, () => {}])

jest.mock(`@material-ui/core/DialogTitle`, () => ({ __esModule: true, default: () => null }))
jest.mock(`@material-ui/core/Avatar`, () => ({ __esModule: true, default: () => null }))
jest.mock(`@material-ui/icons/Translate`, () => ({ __esModule: true, default: () => null }))
jest.mock(`@material-ui/core/Typography`, () => ({ __esModule: true, default: () => null }))

function makeSimpleComponentMock (name) {
  return ({ children }) => <div className={name}>{children}</div>
}
jest.mock(`@material-ui/core/DialogContent`, () => ({ __esModule: true, default: jest.fn() }))
DialogContent.mockImplementation(makeSimpleComponentMock(`DialogContent`))
jest.mock(`@material-ui/core/List`, () => ({ __esModule: true, default: jest.fn() }))
List.mockImplementation(makeSimpleComponentMock(`List`))
jest.mock(`@material-ui/core/ListItem`, () => ({ __esModule: true, default: jest.fn() }))
ListItem.mockImplementation(makeSimpleComponentMock(`ListItem`))
jest.mock(`@material-ui/core/ListItemText`, () => ({ __esModule: true, default: jest.fn() }))
ListItemText.mockImplementation(makeSimpleComponentMock(`ListItemText`))
jest.mock(`lib/links/ReactRouterLink`, () => ({ __esModule: true, default: jest.fn() }))
Link.mockImplementation(makeSimpleComponentMock(`Link`))

jest.mock(`@material-ui/core/DialogActions`, () => ({ __esModule: true, default: () => null }))
jest.mock(`@material-ui/core/Button`, () => ({ __esModule: true, default: () => null }))

jest.mock(`@material-ui/core/Tooltip`, () => ({ __esModule: true, default: () => null }))
jest.mock(`@material-ui/core/IconButton`, () => ({ __esModule: true, default: () => null }))

jest.mock(`@material-ui/core/Dialog`, () => ({ __esModule: true, default: jest.fn() }))
Dialog.mockImplementation(makeSimpleComponentMock(`Dialog`))
jest.mock(`lib/TranslationDialog/useSmoothClosing`, () => ({
  __esModule: true,
  default: (x, y) => y,
}))
describe(`lib/TranslationDialog`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([
      `@material-ui/core`,
      `react`,
      `@material-ui/icons`,
      `prop-types`,
    ])).toMatchSnapshot()
  })
  describe(`TranslationDialog (isOpen false)`, () => {
    let result
    beforeAll(() => {
      isOpenValue = false
      result = renderer.create(<TranslationDialog getLinks={() => {}} />).toJSON()
    })
    it(`should not render links`, () => {
      expect(result).toMatchSnapshot()
    })
  })
  describe(`TranslationDialog (isOpen true)`, () => {
    let result
    beforeAll(() => {
      isOpenValue = true
      function getLinks () {
        return [
          { location: null, otherProps: { key: `null` } },
          { location: {}, otherProps: { key: `not null` } }
        ]
      }
      result = renderer.create(<TranslationDialog getLinks={getLinks} />).toJSON()
    })
    it(`should render links`, () => {
      expect(result).toMatchSnapshot()
    })
  })
})