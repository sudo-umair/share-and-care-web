import React from 'react';
import { Modal } from 'react-bootstrap';
import ButtonView from './ButtonView';

export default function ModalView({
  showModal,
  setShowModal,
  modalTitle,
  modalBody,
  action2Function,
  action2Text,
  action2Color,
  isLoading,
}) {
  return (
    <Modal
      show={showModal}
      backdrop='static'
      keyboard={false}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        {action2Text && (
          <ButtonView
            variant={action2Color}
            isLoading={isLoading}
            onClick={() => {
              action2Function();
              setShowModal(false);
            }}
          >
            {action2Text}
          </ButtonView>
        )}
        <ButtonView variant='secondary' onClick={() => setShowModal(false)}>
          Close
        </ButtonView>
      </Modal.Footer>
    </Modal>
  );
}
