import React from "react"
import Frame from "local/Frame"
import locales from "./locales"
import FancyCard from "../FancyCard"
const Home = ({ match, language, frameProps }) => {
  if (!match) {
    return null
  }
  const { appTitle, text } = locales.render[language]
  return (
      <Frame {...frameProps} subtitle={appTitle}>
      <FancyCard>{text}</FancyCard>
    </Frame>
  )
}
export default {
  Component: Home,
  locales: locales.exports,
}
