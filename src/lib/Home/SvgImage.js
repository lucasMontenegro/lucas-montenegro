import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import PropTypes from "prop-types"
const useStyles = makeStyles(() => ({ // scale svg using the padding-bottom hack
  container: {
    position: `relative`,
    height: 0,
    width: `100%`,
    padding: 0,
    paddingBottom: `100%`, // over-ride this inline for aspect ratio other than square
  },
  svg: {
    position: `absolute`,
    height: `100%`,
    width: `100%`,
    left: 0,
    right: 0,
  },
}), { name: `lib-home-svg_image` })
export default function SvgImage ({ isDark, source }) {
  const classes = useStyles()
  const Svg = isDark ? source.dark : source.light
  return (
    <div className={classes.container} style={{ paddingBottom: source.aspectRatio }}>
      <Svg className={classes.svg} />
    </div>
  )
}
SvgImage.propTypes = {
  isDark: PropTypes.bool.isRequired,
  source: PropTypes.shape({
    light: PropTypes.elementType.isRequired,
    dark: PropTypes.elementType.isRequired,
    aspectRatio: PropTypes.string.isRequired,
  }).isRequired,
}