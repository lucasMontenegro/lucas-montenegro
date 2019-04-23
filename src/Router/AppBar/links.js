import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import clone from 'lodash/clone';

export class IconLink extends React.Component {
  Link = React.forwardRef((itemProps, ref) => (
    <RouterLink {...itemProps} to={this.props.to} innerRef={ref} />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.Link;
    delete props.to;
    return <IconButton {...props} />;
  }
}

export class ListLinkItem extends React.Component {
  Link = React.forwardRef((itemProps, ref) => (
    <NavLink
      {...itemProps}
      exact={this.props.exact}
      to={this.props.to}
      innerRef={ref}
    />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.Link;
    props.button = true;
    const { key } = props;
    delete props.to;
    delete props.exact;
    delete props.key;
    return <li key={key}><ListItem {...props} /></li>;
  }
}
