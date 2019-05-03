import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

class CardLinkArea extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <RouterLink {...itemProps} to={this.props.to} innerRef={ref} />
  ));
  render() {
    return (
      <CardActionArea
        {...this.props}
        component={this.WrappedLink}
        to={undefined}
      />
    );
  }
}

const Link = withStyles(theme => ({
  root: {
    margin: `${theme.spacing(2)}px`,
  },
}))(props => (
  <Card className={props.classes.root}>
    <CardLinkArea to={props.to}>
      <CardContent>
        <Typography variant="h5">{props.children}</Typography>
      </CardContent>
    </CardLinkArea>
  </Card>
));

const Container = withStyles(theme => ({
  root: {
    margin: `${theme.spacing(2)}px auto`,
    maxWidth: '60ch',
  },
}))(props => <div className={props.classes.root}>{props.children}</div>);

const in9alPage = render => () => <Container>{render(Link)}</Container>;

export default in9alPage;
