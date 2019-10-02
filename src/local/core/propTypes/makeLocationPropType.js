import PropTypes from "prop-types"
export default function makeLocationPropType (statePropType) {
  return PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: statePropType || PropTypes.any,
  })
}