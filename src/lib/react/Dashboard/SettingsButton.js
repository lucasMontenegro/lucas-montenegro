import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
export default function CloseButton (props) {
  return (
    <Tooltip
      title={props.t({
        en: () => `Settings`,
        es: () => `Configuración`,
      })}
    >
      <IconButton
        edge="end"
        className="icon-button"
        aria-controls="lib-react-settings"
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={[`fas`, `cog`]} />
      </IconButton>
    </Tooltip>
  )
}