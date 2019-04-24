import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';
import clone from 'lodash/clone';

class ConnectedLink extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <RouterLink {...itemProps} to={this.props.to} innerRef={ref} />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.WrappedLink;
    delete props.to;
    return <MaterialLink {...props} />;
  }
}

const Link = ({ connected, ...props }) => connected
  ? <ConnectedLink {...props} />
  : <MaterialLink {...props} />;

export default Link;
