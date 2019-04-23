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
  skillsItem: {
    width: '25ch',
  },
  skillsCard: {
    //height: '10em',
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
};

const SkillsCard = ({ t, classes }) => (
  <Grid container>
    <Grid item className={classes.skillsItem}>
      {Object.values(skills).map((card, i) => (
        <Card key={i.toString()} className={classes.skillsCard}>
          <CardHeader 
            titleTypographyProps={{ align: 'center' }}
            title={card.header}
            />
          <Divider />
          <CardContent>
            <List>
              {Object.values(card.list).reduce((items, skill, k) => {
                const divider = k === 0 ? null : (
                  <Divider component="li" variant="inset" />
                );
                items.push(divider);
                items.push(
                  <ListItem key={k.toString()}>
                    <ListItemAvatar>
                      <Avatar><skill.Icon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={skill.text} />
                  </ListItem>
                );
                return items;
              }, [])}
            </List>
          </CardContent>
        </Card>
      ))}
    </Grid>
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
