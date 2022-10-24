import React, { useState, useReducer } from "react";
import { ToastContainer } from "react-toastify";
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const submitForm = (data) => {
    // Add new idea
    dispatch({
      type: "add",
      newIdea: {
        title: data.title,
        description: data.description,
        createdAt: Date.now(),
        editEnabled: false,
      },
    });
    setModalIsOpen(false);
    setStoredIdeas(state.ideas);
  };

  //   Delete by exact time of creation
  const handleDeleteCard = (timeOfCreation) => {
    dispatch({
      type: "delete",
      createdAt: timeOfCreation,
    });
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

  const handleModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
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
      <CardModal
        title="Add new"
        modalIsOpen={modalIsOpen}
        closeModal={handleModal}
      >
        <Form submitForm={submitForm} />
      </CardModal>

      <header className={styles.header}>
        <h1 className="text-blue">Idea Board</h1>
      </header>
      <div className={styles.addContainer}>
        <button className="btn btn-primary" onClick={handleModal}>
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
            />
          );
        })}
      </div>
    </div>
  );
}

// To do:
// caryying
// local storage
//
