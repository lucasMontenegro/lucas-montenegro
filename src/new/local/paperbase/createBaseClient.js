import React, { Fragment } from "react"
import { ThemeProvider } from "@material-ui/styles"
import lightTheme from "new/local/paperbase/themes/light"
import darkTheme from "new/local/paperbase/themes/dark"
import Body from "new/local/paperbase/Body"
import { createBluePortal } from "new/local/paperbase/portals"
import LanguageDialog from "new/local/paperbase/LanguageDialog"
import makeLanguageDialogState from "new/local/paperbase/makeLanguageDialogState"
import NavLink from "new/local/paperbase/NavLink"
import makeClientLocation from "new/local/paperbase/makeClientLocation"
import PropTypes from "prop-types"
import { languageCodePropType } from "new/local/supportedLanguages"
import makeLocationPropType from "new/local/paperbase/propTypes/makeLocationPropType"
import { viewStatePropType } from "new/local/paperbase/useViewState"
import { makeTranslationsPropType } from "new/local/utils/makeTranslations"
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
        <ThemeProvider theme={lightTheme}>
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
              linkId={`${appName}-${clientName}-navLink`}
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
  return BaseClient
}
export const clientPropTypes = createBaseClient.clientPropTypes = {
  match: PropTypes.bool.isRequired,
  languageCode: languageCodePropType.isRequired,
  location: makeLocationPropType().isRequired,
  viewState: viewStatePropType.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  logo: PropTypes.node.isRequired,
  titles: makeTranslationsPropType(PropTypes.string).isRequired,
}