import React from "react"
import locales from "./locales"
import FancyCard from "../FancyCard"
function NotFound ({ match, languageCode, routerProps, Wrapper, wrapperProps }) {
  if (!match) {
    return null
  }
  const render = locales.render[languageCode]
  const { state } = routerProps.location
  const referrer = state && state.referrer
  return (
    <Wrapper subtitle={render.appTitle} other={wrapperProps}>
      {referrer
        ? (
          <FancyCard title={`${referrer.pathname}${referrer.search}${referrer.hash}`}>
            {render.text}
          </FancyCard>
        )
        : <FancyCard>{render.defaultText}</FancyCard>
      }
    </Wrapper>
  )
}
export default {
  AppBody: NotFound,
  locales: locales.routerOptions,
}