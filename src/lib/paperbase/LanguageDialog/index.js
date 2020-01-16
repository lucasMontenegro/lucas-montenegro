import React, { useState, Fragment } from "react"
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
import PropTypes from "prop-types"
export default function LanguageDialog ({ getLinks }) {
  const [isOpen, saveIsOpen] = useState(false)
  const close = () => saveIsOpen(false)
  const currentTranslation = translation.get()
  const children = useSmoothClosing(isOpen, [
    <Title key="title" text={currentTranslation.title} />,
    <Content
      key="content"
      links={getLinks().map(({ location, otherProps }) => {
        if (location) {
          return (
            <ListItemLink
              key={otherProps.key}
              to={location}
              onClick={close}
              id={otherProps.id}
              text={otherProps.text}
            />
          )
        }
        return (
          <ListItem
            key={otherProps.key}
            activeLabel={currentTranslation.activeLinkLabel}
            text={otherProps.text}
          />
        )
      })}
    />,
    <Actions key="actions" onClose={close} closeButtonText={currentTranslation.closeButtonText} />,
  ])
  return (
    <Fragment>
      <OpenButton onClick={() => saveIsOpen(true)} label={currentTranslation.openButtonLabel} />
      <Dialog isOpen={isOpen} onClose={close}>{children}</Dialog>
    </Fragment>
  )
}
LanguageDialog.propTypes = {
  getLinks: PropTypes.func.isRequired,
}