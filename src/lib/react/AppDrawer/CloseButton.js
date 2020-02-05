import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
export default function CloseButton (props) {
  return props.isDesktop ? null : (
    <Tooltip
      title={props.t({
        en: () => `Close drawer`,
        es: () => `Cerrar panel lateral`,
      })}
    >
      <IconButton
        edge="start"
        className="icon-button"
        aria-controls="lib-react-app_drawer"
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={[`fas`, `arrow-left`]} />
      </IconButton>
    </Tooltip>
  )
}