import React, { useState } from "react"
import renderer from "react-test-renderer"
import translation from "lib/paperbase/LanguageDialog/translation"
import useSmoothClosing from "lib/paperbase/LanguageDialog/useSmoothClosing"
import {
  Title,
  Content,
  ListItemLink,
  ListItem,
  Actions,
  OpenButton,
  Dialog
} from "lib/paperbase/LanguageDialog/view"
import LanguageDialog from "lib/paperbase/LanguageDialog"
jest.mock(`react`, () => {
  const react = jest.requireActual("react")
  return {
    ...react,
    __esModule: true,
    default: react,
    useState: jest.fn(),
  }
})
let isOpen
const saveIsOpen = value => `saveIsOpen(${JSON.stringify(value)})`
useState.mockImplementation(() => [isOpen, saveIsOpen])
jest.mock(`lib/paperbase/LanguageDialog/translation`, () => ({ __esModule: true, default: {} }))
translation.get = () => ({
  activeLinkLabel: `currentTranslation.activeLinkLabel`,
  openButtonLabel: `currentTranslation.openButtonLabel`,
  title: `currentTranslation.title`,
  closeButtonText: `currentTranslation.closeButtonText`,
})
jest.mock(`lib/paperbase/LanguageDialog/useSmoothClosing`, () => ({
  __esModule: true,
  default: jest.fn((isOpen, children) => children),
}))
jest.mock(`lib/paperbase/LanguageDialog/view`, () => ({
  __esModule: true,
  Title (props) {
    return <div className="Title">{props.text}</div>
  },
  Content (props) {
    return <div className="Content">{props.links}</div>
  },
  ListItemLink (props) {
    return (
      <div className="ListItemLink">
        <div className="to">{JSON.stringify(props.to)}</div>
        <div className="onClick">{props.onClick()}</div>
        <div className="id">{props.id}</div>
        <div className="text">{props.text}</div>
      </div>
    )
  },
  ListItem (props) {
    return (
      <div className="ListItem">
        <div className="activeLabel">{props.activeLabel}</div>
        <div className="text">{props.text}</div>
      </div>
    )
  },
  Actions (props) {
    return (
      <div className="Actions">
        <div className="onClose">{props.onClose()}</div>
        <div className="closeButtonText">{props.closeButtonText}</div>
      </div>
    )
  },
  OpenButton (props) {
    return (
      <div className="OpenButton">
        <div className="onClick">{props.onClick()}</div>
        <div className="label">{props.label}</div>
      </div>
    )
  },
  Dialog (props) {
    return (
      <div className="Dialog">
        <div className="isOpen">{JSON.stringify(props.isOpen)}</div>
        <div className="onClose">{props.onClose()}</div>
        <div className="children">{props.children}</div>
      </div>
    )
  },
}))
const getLinks = (links => () => links)([
  {
    location: null,
    otherProps: {
      key: `en`,
      id: `translate-to-en`,
      text: `English`,
    },
  },
  {
    location: { pathname: `/es` },
    otherProps: {
      key: `es`,
      id: `translate-to-es`,
      text: `Spanish`,
    },
  },
])
describe(`lib/paperbase/LanguageDialog`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react`, `prop-types`])).toMatchSnapshot()
  })
  describe.each([[true], [false]])(`LanguageDialog (isOpen %j)`, isOpenValue => {
    let result
    beforeAll(() => {
      isOpen = isOpenValue
      result = renderer.create(<LanguageDialog getLinks={getLinks} />).toJSON()
    })
    it(`should set up useSmoothClosing`, () => {
      expect(useSmoothClosing.mock.calls).toHaveProperty([0, 0], isOpenValue)
      useSmoothClosing.mockClear()
    })
    it(`should render`, () => {
      expect(result).toMatchSnapshot()
    })
  })
})