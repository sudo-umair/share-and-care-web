import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ModalView({
  showModal,
  setShowModal,
  modalTitle,
  modalBody,
  action2Function,
  action2Text,
}) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        {action2Function && (
          <Button variant='secondary' onClick={() => action2Function()}>
            {action2Text}
          </Button>
        )}
        <Button variant='secondary' onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
