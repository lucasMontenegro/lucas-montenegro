import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';
import clone from 'lodash/clone';

class Link extends React.Component {
  Link = React.forwardRef((itemProps, ref) => (
    <RouterLink {...itemProps} to={this.props.to} innerRef={ref} />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.Link;
    delete props.to;
    return <MaterialLink {...props} />;
  }
}

export default Link;
