import { useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import PropTypes from "prop-types"
export default function useViewState (breakpoint) {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down(theme.spacing(breakpoint)))
  const [isOpen, setOpenState] = useState(false)
  return {
    isMobile,
    drawer: {
      isOpen,
      open () {
        setOpenState(true)
      },
      close () {
        setOpenState(false)
      },
    }
  }
}
export const viewStatePropType = PropTypes.shape({
  isMobile: PropTypes.bool.isRequired,
  drawer: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  }).isRequired,
})