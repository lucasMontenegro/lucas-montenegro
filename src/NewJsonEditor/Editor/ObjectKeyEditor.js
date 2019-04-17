import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

export const PureObjectKeyEditor = ({ id }) => (
  <Modal show={id}>
    <Modal.Header closeButton>
      <Modal.Title>Editing Object Key</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
  </Modal>
);

const mapStateToProps = (state, ownProps) => {
  const { id } = state.jsonEditor.objectKeyEditor;
  return { id };
}

const ObjectKeyEditor = connect(
  mapStateToProps
)(PureObjectKeyEditor);

export default ObjectKeyEditor;
