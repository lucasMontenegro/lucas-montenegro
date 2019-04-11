import { connect } from 'react-redux';
import { updateKey, saveKey, closeKeyEditor } from '../actions';
import KeyEditorCmp from '../components/KeyEditorCmp';

const mapStateToProps = state => {
  const { id, key, unique } = state.jsonEditor.keyEditor;
  if (!id) return { value: null };
  return { value: key || '', unique };
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (e) {
      dispatch(updateKey(e.target.value));
    },
    onSave () {
      dispatch(saveKey());
    },
    onCancel () {
      dispatch(closeKeyEditor());
    }
  };
}

const KeyEditorCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyEditorCmp);

export default KeyEditorCont;