import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
export default function CloseButton (props) {
  return props.isDesktop ? null : (
    <Tooltip
      title={props.t({
        en: () => `Close dashboard`,
        es: () => `Cerrar panel de control`,
      })}
    >
      <IconButton
        edge="start"
        className="icon-button"
        aria-controls="lib-react-dashboard"
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={[`fas`, `arrow-left`]} />
      </IconButton>
    </Tooltip>
  )
}