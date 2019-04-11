import { connect } from 'react-redux';
import { updateKey, saveKey } from '../actions';
import KeyEditorCmp from '../components/KeyEditorCmp';

const mapStateToProps = state => {
  const { id, key } = state.jsonEditor.keyEditor;
  if (!id) return { value: null };
  return { value: key || '' };
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (e) {
      dispatch(updateKey(e.target.value));
    },
    onSave () {
      dispatch(saveKey());
    }
  };
}

const KeyEditorCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyEditorCmp);

export default KeyEditorCont;