import React from 'react';
import in9alPage from './in9alPage';
import español from './español';
import english from './english';

export default (Router, Route) => (
  <Router lang404={in9alPage}>
    <Route
      name="English"
      path="/english"
      home="/home"
      render={english}
    />
    <Route
      name="Español"
      path="/español"
      home="/inicio"
      render={español}
    />
  </Router>
);
