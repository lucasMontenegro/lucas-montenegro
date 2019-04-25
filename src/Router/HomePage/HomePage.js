import React, { Suspense } from 'react';
import { withTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListLinkItem } from '../links';

import { Link } from '../../nuts-and-bolts';
import SkillsCards from './SkillsCards';
import ProjectsCards from './ProjectsCards';
import Spinner from '../Spinner';

const contactLinks = (obj => Object.keys(obj).map(key => {
  const item = obj[key];
  item.key = key;
  return item;
}))({
  linkedin: {
    text: 'Linkedin',
    href: 'https://www.linkedin.com/in/lucas-montenegro-1b191915a/',
    Icon: () => <FontAwesomeIcon icon={['fab', 'linkedin']} />,
  },
  github: {
    text: 'GitHub',
    href: 'https://github.com/lucasMontenegro/',
    Icon: () => <FontAwesomeIcon icon={['fab', 'github']} />,
  },
});

const styles = {
  main: {
    padding: '1em 0',
  },
  section: {
    fontSize: '1rem',
    width: '100%',
    margin: '3em auto',
    maxWidth: '80ch',
  },
  header: {
    marginBottom: '0.5em',
  },
  footer: {
    padding: '1em 0',
    background: '#eaeff1',
  }
};

const FuncHomePage = ({ t, classes }) => (
  <div>
    <main className={classes.main}>
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
            <Link href="#my-projects">link</Link>
            end
          </Trans>
        </Typography>
      </section>
      <section className={classes.section}>
        <Typography className={classes.header} component="header" variant="h4">
          {t('home.skills.title')}
        </Typography>
        <SkillsCards t={t} />
      </section>
      <section id="my-projects" className={classes.section}>
        <Typography className={classes.header} component="header" variant="h4">
          {t('myProjects.title')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('myProjects.description')}
        </Typography>
        <ProjectsCards />
      </section>
    </main>
    <footer className={classes.footer}>
      <section className={classes.section}>
        <List
          subheader={
            <ListSubheader color="inherit">
              {t('home.contact.title')}
            </ListSubheader>
          }
        >
          {contactLinks.map(({ key, href, text, Icon }) => (
            <ListLinkItem key={key} href={href}>
              <ListItemIcon>
                {Icon 
                  ? <Icon /> 
                  : <FontAwesomeIcon icon={['fas', 'circle']}/>
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListLinkItem>
          ))}
        </List>
      </section>
    </footer>
  </div>
);

const StyledHomePage = withStyles(styles)(FuncHomePage);
const LazyHomePage = withTranslation()(StyledHomePage);

const HomePage = () => (
  <Suspense fallback={<Spinner />}>
    <LazyHomePage />
  </Suspense>
);

export default HomePage;
