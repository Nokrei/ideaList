import React, { useState, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "../utils/useLocalStorage";
import reducer, { initialState } from "../state/reducer";
import CardModal from "../components/CardModal";
import Card from "../components/Card";
import styles from "../styles/Main.module.css";
import Form from "../components/Form";

export default function MainPage() {
  const [storedIdeas, setStoredIdeas] = useLocalStorage("ideaList", []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [newDescription, setNewDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const submitForm = (data) => {
    dispatch({
      type: "add",
      payload: {
        title: data.title,
        description: data.description,
        createdAt: Date.now(),
        editEnabled: false,
      },
    });
    setModalIsOpen(false);
    setStoredIdeas(state.ideas);
    console.log(storedIdeas);
  };

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
    dispatch({
      type: "changeDescription",
      payload: id,
    });
  };

  // Replace old description with new
  const handleSaveNewDescription = (id) => {
    dispatch({
      type: "saveNewDescription",
      payload: {
        id: id,
        newDescription: newDescription,
      },
    });
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

  //  Handle modal open and close
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  // useEffect(() => {
  //   dispatch({
  //     type: "copyFromLocal",
  //     payload: storedIdeas,
  //   });
  // }, [storedIdeas]);

  return (
    <div className={styles.main}>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <CardModal modalIsOpen={modalIsOpen} closeModal={handleModalClose}>
        <Form submitForm={submitForm} />
      </CardModal>

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
              key={card.createdAt}
              title={card.title}
              description={card.description}
              deleteCard={() => handleDeleteCard(card.createdAt)}
              createdAt={card.createdAt}
              updatedAt={card.updatedAt}
              editDescription={() => handleEditDescription(card.createdAt)}
              editEnabled={card.editEnabled}
              newDescription={newDescription}
              changeNewDescription={handleChangeNewDescription}
              saveNewDescription={() => {
                handleSaveNewDescription(card.createdAt);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
