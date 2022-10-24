import React, { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import styles from "../styles/Card.module.css";
import CardModal from "../components/CardModal";
import Form from "../components/Form";

export default function Card({ title, description, createdAt, deleteCard }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const submitForm = ({ title, description }) => {
    setNewTitle(title);
    setNewDescription(description);
    setUpdatedAt(Date.now());
    setModalIsOpen(false);
    toast("Idea Updated!");
  };

  return (
    <div className={styles.card}>
      <CardModal
        title="Edit idea"
        modalIsOpen={modalIsOpen}
        closeModal={handleModalClose}
      >
        <Form submitForm={submitForm} />
      </CardModal>
      <h2>{newTitle || title}</h2>
      <div className={styles.dates}>
        <p>Created on: {new Date(createdAt).toLocaleString("en-GB")}</p>
        {updatedAt && (
          <p>Updated on: {new Date(updatedAt).toLocaleString("en-GB")}</p>
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.description}>
          <p>{newDescription || description}</p>
          <div onClick={handleModalOpen}>
            <FaEdit />
          </div>
        </div>
      </div>

      <div className={styles.delete}>
        <button className={"btn btn-secondary"} onClick={deleteCard}>
          Delete
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  deleteCard: PropTypes.func.isRequired,
};
