import PropTypes from "prop-types"
export const viewStatePropType = PropTypes.shape({
  isMobile: PropTypes.bool.isRequired,
  drawer: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  }).isRequired,
})