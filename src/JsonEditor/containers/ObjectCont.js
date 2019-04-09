import { connect } from 'react-redux';
import ObjectCmp from '../components/ObjectCmp';

const mapStateToProps = (state, ownProps) => {
  const { kids } = state.jsonEditor.byID[ownProps.id];
  return { kids };
}

const ObjectCont = connect(
  mapStateToProps
)(ObjectCmp);

export default ObjectCont;