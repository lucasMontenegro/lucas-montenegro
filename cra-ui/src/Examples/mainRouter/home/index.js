import React from "react"
import locales from "./locales"
import FancyCard from "../FancyCard"
function Home ({ match, languageCode, Wrapper, wrapperProps }) {
  if (!match) {
    return null
  }
  const { appTitle, text } = locales.render[languageCode]
  return (
    <Wrapper subtitle={appTitle} other={wrapperProps}>
      <FancyCard>{text}</FancyCard>
    </Wrapper>
  )
}
export default {
  AppBody: Home,
  locales: locales.routerOptions,
}