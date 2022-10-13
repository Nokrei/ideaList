import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "../utils/useLocalStorage";
import reducer, { initialState } from "../state/reducer";
import styles from "../styles/Form.module.css";

export default function Form({ submitForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [storedIdeas, setStoredIdeas] = useLocalStorage("ideaList", []);

  const onSubmit = (data) => {
    setStoredIdeas((current) => [
      ...current,
      {
        title: data.title,
        description: data.description,
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          defaultValue="test"
          {...register("title", { required: true, maxLength: 20 })}
        />
        {errors.title && <span>This field is required</span>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={10}
          {...register("description", { required: true, maxLength: 140 })}
        />
        {errors.description && <span>This field is required</span>}
      </div>

      <input type="submit" />
    </form>
  );
}
