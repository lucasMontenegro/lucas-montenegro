import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { actions } from './state';
import { languages, i18nRoutes } from './routes';

function Router ({ setTitle, render }) {
  const routeRender = language => {
    const localRoutes = render[language];
    const localRoutesValues = Object.values(localRoutes);
    const n = language.length + 2;
    return renderProps => {
      const { location } = renderProps;
      if (location.pathname.length <= n) {
        renderProps.history.replace(`/${language}/h`);
        return null;
      }
      for (const route of localRoutesValues) {
        if (route.match(location)) {
          setTitle(route.title);
          return <route.Component {...renderProps} />;
        }
      }
      for (const key in i18nRoutes) {
        const i18nRoute = i18nRoutes[key];
        if (i18nRoute.match(location)) {
          const localLocation = localRoutes[key].compile(location);
          return <Redirect to={localLocation} />
          //renderProps.history.replace(localLocation);
          //return null;
        }
      }
      //renderProps.history.replace(`/${language}/404`);
      //return null;
      return <Redirect to={`/${language}/404`} />
    }
  }
  const switchChildren = Object.keys(languages).reduce(
    (children, language) => {
      children.push(
        <Route
          key={'/' + language}
          path={'/' + language}
          render={routeRender(language)}
        />
      );
      return children;
    },
    [<Redirect key="/" exact from="/" to="/english/home" />]
  );
  switchChildren.push(
    <Route
      key="not-found"
      exact path="/not-found"
      render={() => {
        setTitle('Not Found');
        return <div>:(</div>;
      }}
    />,
    <Redirect key="default" to="/not-found" />
  );
  return <Switch>{switchChildren}</Switch>;
}

const mapDispatchToProps = dispatch => ({
  setTitle: str => dispatch(actions.setTitle(str)),
});

export default connect(null, mapDispatchToProps)(Router);
