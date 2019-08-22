import React, { Fragment } from "react"
import { ThemeProvider } from "@material-ui/styles"
import theme from "local/theme"
import darkTheme from "local/darkTheme"
import Body from "local/core/Body"
import { makeBluePortal } from "local/core/portals"
import LanguageDialog from "local/core/LanguageDialog"
import makeLanguageDialogState from "local/core/makeLanguageDialogState"
import NavLink from "local/core/NavLink"
import makeAppLocation from "local/core/makeAppLocation"
export default function createBaseClient (options) {
  const {
    clientName,
    appName,
    initialLocation,
    translators,
  } = options
  const useAppLocation = makeAppLocation(initialLocation, translators)
  const useLanguageDialogState = makeLanguageDialogState(initialLocation, translators)
  const DrawerContent = makeBluePortal(`${appName} > ${clientName} > DrawerContent`)
  const AppLink = makeBluePortal(`${appName} > ${clientName} > AppLink`)
  return function BaseClient (props) {
    const {
      match,
      languageCode,
      location,
      viewState,
      drawerWidth,
      title,
      subtitle,
      logo,
      primaryToolbar,
      secondaryToolbar,
      appLink,
      drawerContent,
      children,
    } = props
    const appLocation = useAppLocation(match, languageCode, location)
    const languageDialogState = useLanguageDialogState(languageCode, appLocation)
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          {match && (
            <Body
              languageCode={languageCode}
              drawerWidth={drawerWidth}
              viewState={viewState}
              title={title}
              subtitle={subtitle}
              logo={logo}
              languageDialog={<LanguageDialog state={languageDialogState} />}
              primaryToolbar={primaryToolbar}
              secondaryToolbar={secondaryToolbar}
            >
              {children}
            </Body>
          )}
        </ThemeProvider>
        <ThemeProvider theme={darkTheme}>
          <DrawerContent>{match && drawerContent}</DrawerContent>
          <AppLink>
            <NavLink
              active={match}
              languageCode={languageCode}
              location={appLocation}
              labels={appLink.labels}
              icons={appLink.icons}
            />
          </AppLink>
        </ThemeProvider>
      </Fragment>
    )
  }
}