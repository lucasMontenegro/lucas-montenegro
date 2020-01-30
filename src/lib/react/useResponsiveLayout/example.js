import useResponsiveLayout from "./index.js"
import React from "react"
import Div from "lib/react/utils/Div"
import { Route } from "react-router-dom"
function Example () {
  const r = useResponsiveLayout()
  return (
    <Div>
      <h4>Responsive Layout Hook</h4>
      <Div color="MediumSeaGreen" id="current-device">
        {r({
          desktop: () => `Desktop device`,
          tablet: () => `Tablet device`,
          mobile: () => `Mobile device`,
        })}
      </Div>
      <Div color="Tomato" id="only-desktop">
        {r({ desktop: () => `Shown only on desktop` })}
      </Div>
      <Div color="SlateBlue" id="only-tablet">
        {r({ tablet: () => `Shown only on tablet` })}
      </Div>
      <Div color="Gold" id="only-mobile">
        {r({ mobile: () => `Shown only on mobile` })}
      </Div>
    </Div>
  )
}
export default (<Route exact path="/react/useResponsiveLayout" component={Example} />)