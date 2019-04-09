import { connect } from 'react-redux';
import ObjectCmp from '../components/ObjectCmp';

const mapStateToProps = (state, ownProps) => {
  const { kids, order } = state.jsonEditor.byID[ownProps.id];
  return { kids, order };
}

const ObjectCont = connect(
  mapStateToProps
)(ObjectCmp);

export default ObjectCont;