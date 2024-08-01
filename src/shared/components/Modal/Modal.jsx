import React from "react";
import Modal from "react-bootstrap/Modal";

const CustomModal = (props) => {
  return (
    <>
      <Modal
        className={props.customClass}
        size={props.size}
        centered={true}
        scrollable={props.scrollable}
        show={props.show}
        onHide={() => props.setShow()}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
