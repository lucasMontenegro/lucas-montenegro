import PropTypes from "prop-types"
import { languageCodePropType } from "local/supportedLanguages"
import makeLocationPropType from "local/core/propTypes/makeLocationPropType"
export default PropTypes.shape({
  type: PropTypes.oneOf([`initializing`, `client`, `redirect`]).isRequired,
  languageCode: languageCodePropType,
  location: makeLocationPropType(),
  clientName: PropTypes.string,
})