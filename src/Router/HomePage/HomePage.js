import React, { Suspense } from 'react';
import { withTranslation, Trans } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Link } from '../../nuts-and-bolts';
import SkillsCards from './SkillsCards';
import ProjectsCards from './ProjectsCards';
import Spinner from '../Spinner';

const styles = {
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
};

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
    <section id="my-projects">
      <Typography className={classes.header} component="header" variant="h4">
        {t('myProjects.title')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('myProjects.description')}
      </Typography>
      <ProjectsCards />
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
