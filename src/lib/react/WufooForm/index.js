import React, { useEffect } from "react"
import globals from "lib/utils/globals"
import embedForm from "./embedForm"
import loadScript from "./loadScript"
export default function WufooForm ({ hash, height }) {
  useEffect(() => {
    if (typeof globals.window.WufooForm === `function`) {
      embedForm(hash, height)
    } else {
      loadScript(hash, height)
    }
  }, [hash, height])
  return <div id={`wufoo-${hash}`} />
}