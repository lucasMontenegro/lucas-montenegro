import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ImportModal from '../ImportModal';
import { actions } from '../ImportModal/state';

const {
  open
} = actions;

export const PureOpenImportModal = ({ content, handleClick }) => (
  <div>
    <ImportModal />
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
  const { content } = state.jsonEditor.importModal;
  return { content };
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: () => dispatch(open())
  };
};

const OpenImportModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureOpenImportModal);

export default OpenImportModal;
