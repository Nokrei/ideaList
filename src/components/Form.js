import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styles from "../styles/Form.module.css";

export default function Form({ submitForm }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const maxLength = 140;
  const count = watch("description");

  const onSubmit = submitForm;

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
        <p>
          {typeof count === "string" ? count.length : 0} / {maxLength}
        </p>
        <textarea
          id="description"
          rows={10}
          {...register("description", { required: true, maxLength: maxLength })}
        />
        {errors.description && <span>This field is required</span>}
      </div>

      <input type="submit" />
    </form>
  );
}

Form.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
