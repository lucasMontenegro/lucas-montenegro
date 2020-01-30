import React from "react"
import { Route, Switch } from "react-router-dom"
import DarkMode from "./DarkMode/example"
import Logo from "./Logo/example"
import Theme from "./Theme/example"
import fontAwesome from "./fontAwesome/example"
import CssBaseline from "./CssBaseline/example"
import throwPropTypeErrors from "./throwPropTypeErrors/example"
import links from "./links/examples"
import routing from "./routing/example"
import WufooForm from "./WufooForm/example"
import useTranslation from "./useTranslation/example"
import AppDrawer from "./AppDrawer/example"
import DocumentTitle from "./DocumentTitle/example"
import useResponsiveLayout from "./useResponsiveLayout/example"
export default (
  <Route
    path="/react"
    render={() => (
      <Switch>
        {DarkMode}
        {Logo}
        {Theme}
        {fontAwesome}
        {CssBaseline}
        {throwPropTypeErrors}
        {links}
        {routing}
        {WufooForm}
        {useTranslation}
        {AppDrawer}
        {DocumentTitle}
        {useResponsiveLayout}
      </Switch>
    )}
  />
)