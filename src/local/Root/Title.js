import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

const Title = ({ title }) => (
  <Typography variant="h4">{title}</Typography>
);
const mapStateToProps = ({ rootApp: { title } }) => ({ title });
export default connect(mapStateToProps)(Title);
