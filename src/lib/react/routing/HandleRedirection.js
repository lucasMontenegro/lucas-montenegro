import { useRoute } from "./context"
import React from "react"
import { Redirect } from "react-router-dom"
export default function HandleRedirection () {
  const route = useRoute()
  if (route.redirect) {
    return <Redirect to={route.redirect} />
  }
  return null
}