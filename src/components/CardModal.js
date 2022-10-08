import React from "react";
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
  modalIsOpen,
  closeModal,
  title,
  changeTitle,
  description,
  changeDescription,
  modalSubmit,
  characterCount,
  createdAt,
  updatedAt,
  createdAtExact,
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
            <h2 className="text-blue">Add New</h2>
            <button className="btn btn-secondary" onClick={closeModal}>
              X
            </button>
          </div>
          <div className={styles.content}>
            <form onSubmit={modalSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={changeTitle}
                  autoFocus
                ></input>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="description">Description</label>
                <span>{characterCount} / 140</span>
                <textarea
                  id="description"
                  rows={10}
                  maxLength={140}
                  value={description}
                  onChange={changeDescription}
                ></textarea>
              </div>
              <input className="btn btn-primary" type="submit" value="Add" />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
