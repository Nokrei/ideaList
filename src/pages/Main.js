import React, { useState, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "../utils/useLocalStorage";
import reducer, { initialState } from "../state/reducer";
import CardModal from "../components/CardModal";
import Card from "../components/Card";
import styles from "../styles/Main.module.css";

export default function MainPage() {
  // Get random ids for keys - currently using the exact date for this
  // const { v4: uuidv4 } = require("uuid");

  // Array to contain all tasks
  // const [ideas, setStoredIdeas] = useState([]);
  // Replaced with local storage
  const [storedIdeas, setStoredIdeas] = useLocalStorage("ideaList", []);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle Modal data
  const [titleFromModal, setTitleFromModal] = useState("");
  const [descriptionFromModal, setDescriptionFromModal] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [newDescription, setNewDescription] = useState("");

  // Handle Modal open and close
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const changeTitleFromModal = (e) => {
    setTitleFromModal(e.target.value);
  };

  const changeDescriptionFromModal = (e) => {
    setDescriptionFromModal(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      payload: {
        title: titleFromModal,
        description: descriptionFromModal,
        createdAt: new Date()
          .toISOString()
          .slice(0, -5)
          .split("T")
          .join(" at "),
        updatedAt: new Date()
          .toISOString()
          .slice(0, -5)
          .split("T")
          .join(" at "),
        createdAtExact: Date.now(),
        editEnabled: false,
      },
    });
    setModalIsOpen(false);
    setTitleFromModal("");
    setDescriptionFromModal("");
  };

  //   Handle card content
  //   Delete by exact time of creation
  const handleDeleteCard = (timeOfCreation) => {
    dispatch({
      type: "delete",
      payload: timeOfCreation,
    });
  };

  // Click edit icon, enable editing
  const handleEditDescription = (id) => {
    dispatch({
      type: "enableEdit",
      payload: id,
    });
  };

  // Input new description
  const handleChangeNewDescription = (id) => {
    setNewDescription(id.target.value);
    const newList = storedIdeas.map((idea) => {
      if (idea.createdAtExact === id) {
        const updatedIdea = {
          ...idea,
          newDescription: id.target.value,
        };
        return updatedIdea;
      }

      return idea;
    });
    setStoredIdeas(newList);
  };

  // Replace old description with new
  const handleSaveNewDescription = (id) => {
    const newList = storedIdeas.map((idea) => {
      if (idea.createdAtExact === id) {
        const updatedIdea = {
          ...idea,
          description: newDescription,
          editEnabled: false,
          updatedAt: new Date()
            .toISOString()
            .slice(0, -5)
            .split("T")
            .join(" at "),
        };
        return updatedIdea;
      }

      return idea;
    });
    setNewDescription("");
    setStoredIdeas(newList);
    toast("Task updated!");
  };

  // Sorting.

  const sortByDate = () => {
    dispatch({
      type: "sortByDate",
    });
  };
  const sortByTitle = () => {
    dispatch({
      type: "sortByTitle",
    });
  };

  return (
    <div className={styles.main}>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <CardModal
        modalIsOpen={modalIsOpen}
        closeModal={handleModalClose}
        modalSubmit={handleModalSubmit}
        title={titleFromModal}
        description={descriptionFromModal}
        characterCount={characterCount}
        changeTitle={changeTitleFromModal}
        changeDescription={changeDescriptionFromModal}
      />

      <header className={styles.header}>
        <h1 className="text-blue">Idea Board</h1>
      </header>
      <div className={styles.addContainer}>
        <button className="btn btn-primary" onClick={handleModalOpen}>
          +
        </button>
      </div>
      <div className={styles.sorting}>
        <button onClick={sortByDate} className="btn btn-primary">
          Sort by date
        </button>
        <button onClick={sortByTitle} className="btn btn-primary">
          Sort by title
        </button>
      </div>
      <div className={styles.container}>
        {state.ideas.map((card) => {
          return (
            <Card
              key={card.createdAtExact}
              title={card.title}
              description={card.description}
              deleteCard={() => handleDeleteCard(card.createdAtExact)}
              createdAt={card.createdAt}
              updatedAt={card.updatedAt}
              editDescription={() => handleEditDescription(card.createdAtExact)}
              editEnabled={card.editEnabled}
              newDescription={newDescription}
              changeNewDescription={handleChangeNewDescription}
              saveNewDescription={() => {
                handleSaveNewDescription(card.createdAtExact);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
