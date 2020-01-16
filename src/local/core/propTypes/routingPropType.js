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
  })).isRequired,
  languageRoutes: PropTypes.shape({
    root: languageRoutePropType.isRequired,
    notFound: languageRoutePropType.isRequired,
  }).isRequired,
  locations: PropTypes.shape({
    home: linkTranslationsPropType.isRequired,
    notFound: linkTranslationsPropType.isRequired,
  }).isRequired,
})