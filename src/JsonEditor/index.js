import { connect } from 'react-redux';
import EditorCmp from './components/EditorCmp';

const mapStateToProps = ({ jsonEditor: { id } }) => ({ id });

const EditorCont = connect(
  mapStateToProps
)(EditorCmp);

export default EditorCont;