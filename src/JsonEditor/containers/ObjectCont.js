import { connect } from 'react-redux';
import { editObjectKey } from '../actions';
import ObjectCmp from '../components/ObjectCmp';

const mapStateToProps = (state, ownProps) => {
  const { kids } = state.jsonEditor.byID[ownProps.id];
  return { kids };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onEdit (key) {
      const { id } = ownProps;
      return () => dispatch(editObjectKey(id, key));
    }
  };
}

const ObjectCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectCmp);

export default ObjectCont;