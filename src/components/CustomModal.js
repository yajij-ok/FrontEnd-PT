import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cancelOrder } from '../features/user/userSlice';

const CustomModal=(handleClose, action, handleShow)=>{
  return (
   <Modal show={handleShow} onHide={handleClose} action = {action} centered aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to cancel this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={action}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CustomModal;