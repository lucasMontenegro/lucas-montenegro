import React from "react"
import Frame from "local/Frame"
import locales from "./locales"
import FancyCard from "../FancyCard"
const NotFound = ({ routerProps, match, language, frameProps }) => {
  if (!match) {
    return null
  }
  const render = locales.render[language]
  const { state } = routerProps.location
  const referrer = state && state.referrer
  return (
    <Frame {...frameProps} subtitle={render.appTitle}>
      {!referrer ? <FancyCard>{render.defaultText}</FancyCard> : (
        <FancyCard title={`${referrer.pathname} ${referrer.search} ${referrer.hash}`}>
          {render.text}
        </FancyCard>
      )}
    </Frame>
  )
}
export default {
  Component: NotFound,
  locales: locales.exports,
}