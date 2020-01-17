import React, { useState } from "react"
import Div from "lib/react/utils/Div"
import Button from "@material-ui/core/Button"
export default function CreateDestroy ({ id, box, Component, props }) {
  const [render, setRender] = useState(false)
  return (
    <Div box={box} color="blue">
      <Div>
        <Button
          id={id}
          variant="outlined"
          color="primary"
          onClick={() => setRender(render => !render)}
        >
          CREATE/DESTROY
        </Button>
      </Div>
      <Div><em>{render ? `alive` : `dead`}</em></Div>
      {render && <Component {...(props || {})} />}
    </Div>
  )
}
