import React, { Fragment } from 'react';

export default Link => (
  <Fragment>
    <Link to="/español">
      Ir a la versión en español
    </Link>
    <Link to="/english">
      Go to the English language website
    </Link>
  </Fragment>
);
