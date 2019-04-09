import { connect } from 'react-redux';
import { updateNumber } from '../actions';
import NumberCmp from '../components/NumberCmp';

const mapStateToProps = (state, ownProps) => {
  const { value } = state.jsonEditor.byID[ownProps.id];
  return { value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: e => {
      dispatch(updateNumber(ownProps.id, e.target.value))
    }
  };
}

const NumberCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberCmp);

export default NumberCont;