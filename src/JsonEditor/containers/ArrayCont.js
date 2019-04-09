import { connect } from 'react-redux';
import ArrayCmp from '../components/ArrayCmp';

const mapStateToProps = (state, ownProps) => {
  const { kids } = state.jsonEditor.byID[ownProps.id];
  return { kids };
}

const ArrayCont = connect(
  mapStateToProps
)(ArrayCmp);

export default ArrayCont;