import useMediaQuery from "@material-ui/core/useMediaQuery"
export default function useResponsiveLayout () {
  const isDesktop = useMediaQuery(theme => theme.breakpoints.up(`md`))
  const isTablet = useMediaQuery(theme => theme.breakpoints.up(`sm`))
  const device = isDesktop ? `desktop` : isTablet ? `tablet` : `mobile`
  return function r (source) {
    return device in source ? source[device]() : null
  }
}