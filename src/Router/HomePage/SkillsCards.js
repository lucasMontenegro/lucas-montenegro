import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Avatar from '@material-ui/core/Avatar';

const skills = Object.values({
  frontEnd: {
    header: 'Front-End',
    list: Object.values({
      html: {
        text: 'HTML5',
        Icon: () => <FontAwesomeIcon icon={['fab', 'html5']} />,
      },
      css: {
        text: 'CSS3',
        Icon: () => <FontAwesomeIcon icon={['fab', 'css3-alt']} />,
      },
      js: {
        text: 'JavaScript',
        Icon: () => <FontAwesomeIcon icon={['fab', 'js']} />,
      },
      react: {
        text: 'React',
        Icon: () => <FontAwesomeIcon icon={['fab', 'react']} />,
      },
    }),
  },
  backEnd: {
    header: 'Back-End',
    list: Object.values({
      node: {
        text: 'NodeJS',
        Icon: () => <FontAwesomeIcon icon={['fab', 'node-js']} />,
      },
      express: {
        text: 'ExpressJS',
        Icon: () => <FontAwesomeIcon icon={['fas', 'server']} />,
      },
      mongo: {
        text: 'MongoDB',
        Icon: () => <FontAwesomeIcon icon={['fas', 'database']} />,
      },
      postgres: {
        text: 'PostgreSQL',
        Icon: () => <FontAwesomeIcon icon={['fas', 'database']} />,
      },
    }),
  },
  testing: {
    header: 'Testing',
    list: Object.values({
      mocha: {
        text: 'Mocha',
        Icon: () => <FontAwesomeIcon icon={['fas', 'code']} />,
      },
      chai: {
        text: 'Chai',
        Icon: () => <FontAwesomeIcon icon={['fas', 'code']} />,
      },
      jest: {
        text: 'Jest',
        Icon: () => <FontAwesomeIcon icon={['fas', 'code']} />,
      },
      empty0: {
        text: '   ',
      },
    }),
  },
  tools: {
    i18n: 'home.skills.tools.title',
    list: Object.values({
      git: {
        text: 'Git',
        Icon: () => <FontAwesomeIcon icon={['fab', 'git']} />,
      },
      vagrant: {
        text: 'Vagrant',
        Icon: () => <FontAwesomeIcon icon={['fas', 'tools']} />,
      },
      postman: {
        text: 'Postman',
        Icon: () => <FontAwesomeIcon icon={['fas', 'tools']} />,
      },
      webpack: {
        text: 'Webpack',
        Icon: () => <FontAwesomeIcon icon={['fas', 'tools']} />,
      },
    }),
  },
});

const skillsList = (list, t) => list.reduce((items, skill, i) => {
  items.push(i === 0 ? null : (
    <Divider
      key={(i * 2 + 1).toString()}
      component="li"
      variant="inset"
      />
  ));
  items.push(
    <ListItem key={(i * 2).toString()}>
      <ListItemAvatar>
        <Avatar>{skill.Icon && <skill.Icon />}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={skill.text || t(skill.i18n)} />
    </ListItem>
  );
  return items;
}, []);

const styles = theme => ({
  container: {
    justifyContent: 'space-around',
  },
  item: {
    width: '38ch',
  },
  card: {
    minHeight: '15em',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const FuncSkillsCards = ({ t, classes }) => (
  <Grid container spacing={2} className={classes.container}>
    {skills.map((card, i) => (
      <Grid item key={i.toString()} className={classes.item}>
        <Card className={classes.card}>
          <CardHeader 
            titleTypographyProps={{ align: 'center' }}
            title={card.header || t(card.i18n)}
            />
          <Divider />
          <CardContent>
            <List>{skillsList(card.list, t)}</List>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const StyledSkillsCards = withStyles(styles)(FuncSkillsCards);

export default StyledSkillsCards;
