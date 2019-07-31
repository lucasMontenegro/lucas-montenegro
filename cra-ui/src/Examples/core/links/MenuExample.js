import React, { Fragment } from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import WorkIcon from "@material-ui/icons/Work"
import { MenuLink } from "local/core/links"
export default class MenuExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorEl: null }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }
  open (event) {
    this.setState({ anchorEl: event.currentTarget })
  }
  close () {
    this.setState({ anchorEl: null })
  }
  render () {
    const { anchorEl } = this.state
    const isOpen = Boolean(anchorEl)
    return (
      <Fragment>
        <Button id="open-menu" color="primary" variant="contained" onClick={this.open}>
          Open Menu
        </Button>
        <Menu
          id="menu-example"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={isOpen}
          onClose={this.close}
        >
          <MenuLink to="/examples/core/links/TargetPage">
            <ListItemAvatar><Avatar><WorkIcon /></Avatar></ListItemAvatar>
            <ListItemText primary="lorem ipsum" secondary="Jan 9, 2014" />
          </MenuLink>
        </Menu>
      </Fragment>
    )
  }
}