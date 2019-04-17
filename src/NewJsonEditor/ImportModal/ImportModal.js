import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';
import { actions } from './state';
import { actions as canvasActions } from '../Canvas';

const {
  update,
  close
} = actions;

const {
  importRaw
} = canvasActions;

const InvalidJson = ({ disabled }) => {
  if (disabled) return null;
  return (
    <div className="mr-auto">
      <em style={{ color: 'red' }}>Invalid JSON!</em>
    </div>
  );
}

export const PureImportModal = props => {
  const {
    content,
    parsed,
    handleChange,
    handleClose,
    makeSaveHandler
  } = props;

  if (content === null) return null;
  const handleSave = makeSaveHandler(parsed);
  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>Importing Raw JSON</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*<Container>
        </Container>*/}
        <textarea
          value={content}
          onChange={handleChange}
          style={{ width: '100%', height: '20em' }}
          />
      </Modal.Body>
      <Modal.Footer>
        <InvalidJson disabled={handleSave} />
        <Button variant="primary" onClick={handleSave} disabled={!handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => {
  const { content, parsed } = state.jsonEditor.importModal;
  return { content, parsed };
}

const mapDispatchToProps = dispatch => ({
  handleChange: e => dispatch(update(e.target.value)),
  handleClose: () => dispatch(close()),
  makeSaveHandler: parsed => {
    if (typeof parsed === 'undefined') return;
    return () => {
      dispatch(close());
      dispatch(importRaw(parsed));
    }
  }
});

const ImportModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureImportModal);

export default ImportModal;
