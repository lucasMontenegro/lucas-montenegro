import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clone from 'lodash/clone';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import todoPng from './todo.png';
import jsonPng from './json.png';

export class ConnectedCardActionArea extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <RouterLink {...itemProps} to={this.props.to} innerRef={ref} />
  ));

  render() {
    const props = clone(this.props);
    props.component = this.WrappedLink;
    delete props.to;
    return <CardActionArea {...props} />;
  }
}

const projects = Object.values({
  todo: {
    href: '/todo',
    header: 'To-Do List',
    description: 'The classic front-end app that everyone makes',
    image: {
      src: todoPng,
      title: 'If you have a little bit of time left, how about start writing your own bucket list — Photo by Glenn Carstens-Peters on Unsplash',
    }
  },
  json: {
    href: '/json-editor',
    header: 'JSON Editor',
    description: 'A simple app for editing JSON documents',
    image: {
      src: jsonPng,
      title: 'Example JSON document',
    }
  },
});

const styles = theme => ({
  container: {
    justifyContent: 'space-around',
  },
  item: {
    width: '38ch',
  },
  media: {
    height: '10em',
  },
  card: {
    backgroundColor: theme.palette.background.paper,
  },
});

const FuncProjectsCards = ({ t, classes }) => (
  <Grid container spacing={2} className={classes.container}>
    {projects.map((card, i) => (
      <Grid item key={i.toString()} className={classes.item}>
        <Card className={classes.card}>
          <ConnectedCardActionArea to={card.href}>
            <CardMedia
              className={classes.media}
              image={card.image.src}
              title={card.image.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {card.header}
              </Typography>
              <Typography component="p">
                {card.description}
              </Typography>
            </CardContent>
          </ConnectedCardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const StyledProjectsCards = withStyles(styles)(FuncProjectsCards);

export default StyledProjectsCards;
