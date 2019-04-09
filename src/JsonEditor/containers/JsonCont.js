import { connect } from 'react-redux';
import JsonCmp from '../components/JsonCmp';

const mapStateToProps = (state, ownProps) => {
  const { type } = state.jsonEditor.byID[ownProps.id];
  return { type };
}

const JsonCont = connect(
  mapStateToProps
)(JsonCmp);

export default JsonCont;