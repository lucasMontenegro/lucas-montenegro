import PropTypes from "prop-types"
import { languageCodePropType } from "local/supportedLanguages"
import linkTranslationsPropType from "local/core/propTypes/linkTranslationsPropType"
const languageRoutePropType = PropTypes.arrayOf(PropTypes.shape({
  languageCode: languageCodePropType.isRequired,
  match: PropTypes.func.isRequired,
}))
export default PropTypes.shape({
  matchRoot: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    languageCode: languageCodePropType.isRequired,
    clientName: PropTypes.string.isRequired,
    match: PropTypes.func.isRequired,
  })),
  languageRoutes: PropTypes.shape({
    root: routesArrayPropType,
    notFound: routesArrayPropType,
  }),
  locations: PropTypes.objectOf(linkTranslationsPropType),
})