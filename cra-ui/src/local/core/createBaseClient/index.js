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
import PropTypes from "prop-types"
import { languageCodePropType } from "local/supportedLanguages"
import makeLocationPropType from "local/core/propTypes/makeLocationPropType"
import { viewStatePropType } from "local/core/useViewState"
import { makeTranslationsPropType } from "local/makeTranslations"
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
  function BaseClient (props) {
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
      responsiveToolbar,
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
              primaryToolbar={primaryToolbar}
              secondaryToolbar={secondaryToolbar}
              responsiveToolbar={(
                <Fragment>
                  {responsiveToolbar}
                  <LanguageDialog state={languageDialogState} />
                </Fragment>
              )}
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
  if (process.env.NODE_ENV !== `test`) {
    BaseClient.propTypes = {
      ...createBaseClient.clientPropTypes,
      subtitles: makeTranslationsPropType(PropTypes.string).isRequired,
      icons: makeTranslationsPropType(PropTypes.node).isRequired,
      primaryToolbar: PropTypes.node,
      secondaryToolbar: PropTypes.node,
      responsiveToolbar: PropTypes.node,
      drawerContent: PropTypes.node,
      children: PropTypes.node,
    }
  }
  return BaseClient
}
createBaseClient.clientPropTypes = {
  match: PropTypes.bool.isRequired,
  languageCode: languageCodePropType.isRequired,
  location: makeLocationPropType().isRequired,
  viewState: viewStatePropType.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  logo: PropTypes.node.isRequired,
  titles: makeTranslationsPropType(PropTypes.string).isRequired,
}