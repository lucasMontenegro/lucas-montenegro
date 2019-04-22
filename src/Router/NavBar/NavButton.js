import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import clone from 'lodash/clone';

class NavButton extends React.Component {
  Link = React.forwardRef((itemProps, ref) => (
    <RouterLink to={this.props.to} {...itemProps} ref={ref} />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.Link;
    delete props.to;
    console.log(props);
    return <IconButton {...props} />;
  }
}

export default NavButton;
