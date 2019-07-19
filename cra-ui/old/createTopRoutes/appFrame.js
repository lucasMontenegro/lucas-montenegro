import React from 'react';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const _Card = withStyles(theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '100ch',
  },
  card: {
    margin: theme.spacing(2),
  },
}))(class _Card extends React.Component {
  constructor (props) {
    super(props);
    this.state = { count: 0 };
    this.intervalID = setInterval(() => this.setState(state => {
      return { count: state.count + 1 };
    }), 1000);
  }
  componentWillUnmount () {
    clearInterval(this.intervalID);
  }
  render () {
    const { classes, header, count, body } = this.props;
    console.log(this.props);
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" gutterBottom>{header}</Typography>
            <Divider />
            <Typography variant="caption">
              {count}
              {this.state.count}
            </Typography>
            <Typography variant="body1">
              {body}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
});

const appFrame = render => () => render(_Card);

export default appFrame;
