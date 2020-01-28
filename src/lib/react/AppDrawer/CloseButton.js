import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import PropTypes from "prop-types"
export default function CloseButton (props) {
  return props.isDesktop ? null : (
    <Tooltip
      title={props.t({
        en: () => `Close drawer`,
        es: () => `Cerrar panel lateral`,
      })}
    >
      <IconButton edge="end" aria-controls="lib-react-app_drawer" onClick={props.onClick}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  )
}
CloseButton.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}