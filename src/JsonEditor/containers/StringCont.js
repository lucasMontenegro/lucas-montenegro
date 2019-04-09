import { connect } from 'react-redux';
import { updateString } from '../actions';
import StringCmp from '../components/StringCmp';

const mapStateToProps = (state, ownProps) => {
  const { value } = state.jsonEditor.byID[ownProps.id];
  return { value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: e => {
      dispatch(updateString(ownProps.id, e.target.value))
    }
  };
}

const StringCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(StringCmp);

export default StringCont;