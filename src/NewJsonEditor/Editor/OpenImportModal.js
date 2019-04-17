import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { actions } from './state';

const { openImportModal } = actions;

export const PureOpenImportModal = ({ content, handleClick }) => (
  <div>
    <hr />
    <Button
      variant="primary"
      disabled={content !== null}
      onClick={handleClick}
      >
      Import From Raw JSON
    </Button>
  </div>
);

const mapStateToProps = state => {
  const { content } = state.jsonEditor.raw;
  return { content };
}

const mapDispatchToProps = dispatch => ({
  handleClick (e) {
    dispatch(openImportModal());
  }
});

const OpenImportModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureOpenImportModal);

export default OpenImportModal;
