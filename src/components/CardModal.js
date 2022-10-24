import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import styles from "../styles/Modal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function CardModal({
  title,
  modalIsOpen,
  closeModal,
  children,
}) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2 className="text-blue">{title}</h2>
            <button className="btn btn-secondary" onClick={closeModal}>
              X
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </Modal>
    </div>
  );
}

CardModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
