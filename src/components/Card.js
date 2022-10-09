import React from "react";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import styles from "../styles/Card.module.css";

export default function Card({
  title,
  description,
  editDescription,
  createdAt,
  createdAtExact,
  updatedAt,
  deleteCard,
  editEnabled,
  newDescription,
  changeNewDescription,
  saveNewDescription,
}) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <div className={styles.dates}>
        <p>Created on: {createdAt}</p>
        <p>Updated on: {updatedAt}</p>
      </div>
      <div className={styles.cardBody}>
        {!editEnabled ? (
          <div className={styles.description}>
            <p>{description}</p>
            <div onClick={editDescription}>
              <FaEdit />
            </div>
          </div>
        ) : (
          <div className={styles.edit}>
            <input
              type="text"
              value={newDescription}
              onChange={changeNewDescription}
              placeholder={description}
            ></input>
            <button className="btn btn-primary" onClick={saveNewDescription}>
              Save
            </button>
          </div>
        )}
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
  title: PropTypes.string,
  description: PropTypes.string,
  editDescription: PropTypes.func,
  createdAt: PropTypes.string,
  createdAtExact: PropTypes.string,
  updatedAt: PropTypes.string,
  deleteCard: PropTypes.func,
  editEnabled: PropTypes.bool,
  newDescription: PropTypes.string,
  changeNewDescription: PropTypes.func,
  saveNewDescription: PropTypes.func,
};
