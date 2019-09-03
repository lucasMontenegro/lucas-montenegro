import React from "react"
import { Redirect } from "react-router-dom"
export default function RedirectTo404 ({ languageCode, referrer, routing }) {
  return <Redirect to={{ ...routing.locations.notFound[languageCode], state: { referrer } }} />
}