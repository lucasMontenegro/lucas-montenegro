import PropTypes from "prop-types"
const supportedLanguages = [`en`, `es`]
export default supportedLanguages
export const languageCodePropType = PropTypes.oneOf(supportedLanguages)