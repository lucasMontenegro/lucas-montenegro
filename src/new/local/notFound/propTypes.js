import PropTypes from "prop-types"
import { languageCodePropType } from "new/local/supportedLanguages"
import { clientPropTypes } from "new/local/paperbase/createBaseClient"
import routingPropType from "new/local/paperbase/routingPropType"
NotFoundView.propTypes = {
  match: PropTypes.bool.isRequired,
  languageCode: languageCodePropType.isRequired,
  referrer: PropTypes.string,
  routing: routingPropType.isRequired,
  BaseClient: PropTypes.elementType.isRequired,
  clientProps: PropTypes.shape(clientPropTypes).isRequired,
}