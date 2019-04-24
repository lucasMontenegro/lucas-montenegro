import React, { Suspense } from 'react';
import { withTranslation, Trans } from 'react-i18next';
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

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { Link } from '../nuts-and-bolts';
import Spinner from './Spinner';

const styles = theme => ({
  root: {
    fontSize: '1rem',
    width: '100%',
    margin: '3em auto',
    maxWidth: '80ch',
  },
  section: {
    marginBottom: '3em',
  },
  header: {
    marginBottom: '0.5em',
  },
  skillsContainer: {
    justifyContent: 'space-around',
  },
  skillsItem: {
    width: '38ch',
  },
  skillsCard: {
    minHeight: '15em',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const skills = {
  frontEnd: {
    header: 'Front-End',
    list: {
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
    },
  },
  backEnd: {
    header: 'Back-End',
    list: {
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
    },
  },
  testing: {
    header: 'Testing',
    list: {
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
    },
  },
  tools: {
    i18n: 'home.skills.tools.title',
    list: {
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
    },
  },
};

const SkillsCard = ({ t, classes }) => (
  <Grid container spacing={2} className={classes.skillsContainer}>
    {Object.values(skills).map((card, i) => (
      <Grid key={i.toString()} item className={classes.skillsItem}>
        <Card className={classes.skillsCard}>
          <CardHeader 
            titleTypographyProps={{ align: 'center' }}
            title={card.header || t(card.i18n)}
            />
          <Divider />
          <CardContent>
            <List>
              {Object.values(card.list).reduce((items, skill, k) => {
                const divider = k === 0 ? null : (
                  <Divider
                    key={(k * 2 + 1).toString()}
                    component="li"
                    variant="inset"
                    />
                );
                items.push(divider);
                items.push(
                  <ListItem key={(k * 2).toString()}>
                    <ListItemAvatar>
                      <Avatar>{skill.Icon && <skill.Icon />}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={skill.text || t(skill.i18n)} />
                  </ListItem>
                );
                return items;
              }, [])}
            </List>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const FuncHomePage = ({ t, classes }) => (
  <main className={classes.root}>
    <section className={classes.section}>
      <Typography className={classes.header} component="header" variant="h4">
        {t('home.welcome.header')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('home.welcome.hi')}
      </Typography>
      <Typography variant="body1" paragraph>
        <Trans i18nKey="home.welcome.thisWebsite">
          start
          <Link to="#my-projects">link</Link>
          end
        </Trans>
      </Typography>
    </section>
    <section className={classes.section}>
      <Typography className={classes.header} component="header" variant="h4">
        {t('home.skills.title')}
      </Typography>
      <SkillsCard t={t} classes={classes} />
    </section>
  </main>
);

const StyledHomePage = withStyles(styles)(FuncHomePage);
const LazyHomePage = withTranslation()(StyledHomePage);

const HomePage = () => (
  <Suspense fallback={<Spinner />}>
    <LazyHomePage />
  </Suspense>
);

export default HomePage;
