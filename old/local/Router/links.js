import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import clone from 'lodash/clone';

export class IconLink extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <RouterLink {...itemProps} to={this.props.to} innerRef={ref} />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.WrappedLink;
    delete props.to;
    return <IconButton {...props} />;
  }
}

class ListNavLinkItem extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <NavLink
      {...itemProps}
      exact={this.props.exact}
      to={this.props.to}
      activeClassName={this.props.activeClassName}
      innerRef={ref}
    />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.WrappedLink;
    props.button = true;
    const { key } = props;
    delete props.to;
    delete props.exact;
    delete props.activeClassName;
    delete props.key;
    return <li key={key}><ListItem {...props} /></li>;
  }
}

class ListConnectedLinkItem extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <RouterLink
      {...itemProps}
      to={this.props.to}
      innerRef={ref}
    />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.WrappedLink;
    props.button = true;
    const { key } = props;
    delete props.to;
    delete props.key;
    return <li key={key}><ListItem {...props} /></li>;
  }
}

export const ListLinkItem = ({ connected, nav, ...props }) => !connected
  ? <ListItem button component="a" {...props} />
  : nav
    ? <ListNavLinkItem {...props} />
    : <ListConnectedLinkItem {...props} />;
