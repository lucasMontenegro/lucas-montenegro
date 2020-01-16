import { makeStyles } from "@material-ui/styles"
export default makeStyles(theme => ({
  root: {
    maxWidth: 600,
  },
  referrer: {
    margin: 16,
    padding: `8px 16px`,
    borderLeft: `2px solid ${theme.palette.text.secondary}`,
  },
  link: {
    margin: 16,
    textAlign: `right`,
  },
}), { name: `NotFoundView` })