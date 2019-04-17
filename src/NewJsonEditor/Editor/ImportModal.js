import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { actions } from './state';

const {
  updateRawJson,
  closeImportModal,
  saveRawJson
} = actions;

export const PureImportModal = props => {
  const { content, invalid, handleChange, handleClose, handleSave } = props;
  if (content === null) return null;
  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>Importing Raw JSON</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea value={content} onChange={handleChange} />
        {invalid ? (<div><em>Invalid JSON!</em></div>) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button disabled={invalid} variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => {
  const { content, invalid } = state.jsonEditor.raw;
  return { content, invalid };
}

const mapDispatchToProps = dispatch => ({
  handleChange (e) {
    dispatch(updateRawJson(e.target.value));
  },
  handleClose () {
    dispatch(closeImportModal());
  },
  handleSave () {
    dispatch(saveRawJson());
  }
});

const ImportModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureImportModal);

export default ImportModal;
