import React, { Fragment } from "react"
import { ThemeProvider } from "@material-ui/styles"
import theme from "local/theme"
import darkTheme from "local/darkTheme"
import Body from "local/core/Body"
import { createBluePortal } from "local/core/portals"
import LanguageDialog from "local/core/LanguageDialog"
import makeLanguageDialogState from "local/core/makeLanguageDialogState"
import NavLink from "local/core/NavLink"
import makeClientLocation from "local/core/makeClientLocation"
export default function createBaseClient (options) {
  const {
    clientName,
    appName,
    initialLocation,
    linkTranslators,
    customClientLocation,
  } = options
  const useClientLocation = makeClientLocation({
    initialLocation,
    linkTranslators,
    forwardLocation: customClientLocation,
  })
  const useLanguageDialogState = makeLanguageDialogState({ initialLocation, linkTranslators })
  const DrawerContent = createBluePortal(`${appName} > ${clientName} > DrawerContent`)
  const ClientLink = createBluePortal(`${appName} > ${clientName} > ClientLink`)
  return function BaseClient (props) {
    const {
      match,
      languageCode,
      location,
      viewState,
      drawerWidth,
      logo,
      titles,

      subtitles,
      icons,
      primaryToolbar,
      secondaryToolbar,
      drawerContent,
      children,
    } = props
    const clientLocation = useClientLocation(match, languageCode, location)
    const languageDialogState = useLanguageDialogState(languageCode, clientLocation)
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          {match && (
            <Body
              languageCode={languageCode}
              drawerWidth={drawerWidth}
              viewState={viewState}
              logo={logo}
              titles={titles}
              subtitles={subtitles}
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
          <ClientLink>
            <NavLink
              active={match}
              languageCode={languageCode}
              location={clientLocation}
              labels={subtitles}
              icons={icons}
            />
          </ClientLink>
        </ThemeProvider>
      </Fragment>
    )
  }
}