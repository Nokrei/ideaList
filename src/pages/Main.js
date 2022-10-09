import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "../utils/useLocalStorage";
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

  // Handle Modal open and close
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  // Handle Modal data
  const [titleFromModal, setTitleFromModal] = useState("");

  const [descriptionFromModal, setDescriptionFromModal] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const changeTitleFromModal = (e) => {
    setTitleFromModal(e.target.value);
  };

  const changeDescriptionFromModal = (e) => {
    setDescriptionFromModal(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    setStoredIdeas((current) => [
      ...current,
      {
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
    ]);

    setModalIsOpen(false);
    setTitleFromModal("");
    setDescriptionFromModal("");
  };

  //   Handle card content
  //   Delete by exact time of creation
  const handleDeleteCard = (timeOfCreation) => {
    setStoredIdeas((current) =>
      current.filter((idea) => {
        return idea.createdAtExact !== timeOfCreation;
      })
    );
  };

  // Click edit icon, enable editing
  const handleEditDescription = (id) => {
    const newList = storedIdeas.map((idea) => {
      if (idea.createdAtExact === id) {
        const updatedIdea = {
          ...idea,
          editEnabled: true,
        };
        return updatedIdea;
      }

      return idea;
    });
    setStoredIdeas(newList);
  };

  const [newDescription, setNewDescription] = useState("");

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

  // Sorting. Tried other ways - this sucks, but works
  const [sortByDate, setSortByDate] = useState(true);

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
        <button onClick={() => setSortByDate(true)} className="btn btn-primary">
          Sort by date
        </button>
        <button
          onClick={() => setSortByDate(false)}
          className="btn btn-primary"
        >
          Sort by title
        </button>
      </div>
      <div className={styles.container}>
        {storedIdeas && !sortByDate
          ? storedIdeas
              .sort((a, b) => (b.title > a.title ? 1 : -1))
              .map((card) => {
                return (
                  <Card
                    key={card.createdAtExact}
                    title={card.title}
                    description={card.description}
                    deleteCard={() => handleDeleteCard(card.createdAtExact)}
                    createdAt={card.createdAt}
                    updatedAt={card.updatedAt}
                    editDescription={() =>
                      handleEditDescription(card.createdAtExact)
                    }
                    editEnabled={card.editEnabled}
                    newDescription={newDescription}
                    changeNewDescription={handleChangeNewDescription}
                    saveNewDescription={() => {
                      handleSaveNewDescription(card.createdAtExact);
                    }}
                  />
                );
              })
          : storedIdeas &&
            storedIdeas
              .sort((a, b) => (a.createdAtExact > b.createdAtExact ? 1 : -1))
              .map((card) => {
                return (
                  <Card
                    key={card.createdAtExact}
                    title={card.title}
                    description={card.description}
                    deleteCard={() => handleDeleteCard(card.createdAtExact)}
                    createdAt={card.createdAt}
                    updatedAt={card.updatedAt}
                    editDescription={() =>
                      handleEditDescription(card.createdAtExact)
                    }
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
