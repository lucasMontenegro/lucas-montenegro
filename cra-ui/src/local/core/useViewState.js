import { useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
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