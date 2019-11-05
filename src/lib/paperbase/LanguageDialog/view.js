import React from "react"
import FontAwesomeIcon from "lib/fontAwesome/FontAwesomeIcon"
import IconButton from "@material-ui/core/IconButton"
import PropTypes from "prop-types"

import MuiDialog from "@material-ui/core/Dialog"
import { makeStyles } from "@material-ui/styles"

import DialogTitle from "@material-ui/core/DialogTitle"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"

import DialogContent from "@material-ui/core/DialogContent"
import List from "@material-ui/core/List"

import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"

import MuiListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

import ReactRouterLink from "lib/links/ReactRouterLink"

const icon = <FontAwesomeIcon icon={[`fas`, `language`]} />
export function OpenButton ({ onClick, label }) {
  return (
    <IconButton
      id="open-language-dialog"
      aria-label={label}
      aria-controls="language-dialog"
      aria-haspopup="true"
      onClick={onClick}
      color="inherit"
    >
      {icon}
    </IconButton>
  )
}
OpenButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export function Dialog ({ isOpen, onClose, children }) {
  return (
    <MuiDialog
      id="language-dialog"
      aria-labelledby="language-dialog-title"
      onClose={onClose}
      open={isOpen}
      scroll="body"
    >
      {children}
    </MuiDialog>
  )
}
Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const useTitleStyles = makeStyles(theme => ({
  dialogTitle: {
    display: `flex`,
    alignItems: `center`,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark,
  },
}), { name: `language-dialog-title` })
export function Title ({ text, ...props }) {
  const classes = useTitleStyles()
  return (
    <DialogTitle
      {...props}
      id="language-dialog-title"
      className={classes.dialogTitle}
      disableTypography
    >
      <Avatar className={classes.avatar}>{icon}</Avatar>
      <Typography component="h2" variant="h6">{text}</Typography>
    </DialogTitle>
  )
}
Title.propTypes = {
  text: PropTypes.string.isRequired,
}

export function Content ({ links, ...props }) {
  return <DialogContent {...props}><nav><List>{links}</List></nav></DialogContent>
}
Content.propTypes = {
  links: PropTypes.array.isRequired,
}

export function Actions ({ onClose, closeButtonText, ...props }) {
  return (
    <DialogActions {...props}>
      <Button
        id="close-language-dialog"
        aria-controls="language-dialog"
        onClick={onClose}
        color="primary"
      >
        {closeButtonText}
      </Button>
    </DialogActions>
  )
}
Actions.propTypes = {
  onClose: PropTypes.func.isRequired,
  closeButtonText: PropTypes.string.isRequired,
}

export function ListItem ({ activeLabel, text }) {
  return (
    <MuiListItem>
      <ListItemText aria-label={activeLabel}>
        {text}
      </ListItemText>
    </MuiListItem>
  )
}
ListItem.propTypes = {
  activeLabel: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export function ListItemLink ({ to, onClick, id, text }) {
  return (
    <MuiListItem>
      <ListItemText>
        <ReactRouterLink id={id} onClick={onClick} to={to}>
          {text}
        </ReactRouterLink>
      </ListItemText>
    </MuiListItem>
  )
}
ListItemLink.propTypes = {
  to: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}