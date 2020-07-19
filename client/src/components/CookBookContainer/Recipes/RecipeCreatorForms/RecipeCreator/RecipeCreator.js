import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";

import { Textarea, Input } from "../../../../../formsControl/formsControl";
import {
  maxLengthCreator,
  required,
  minLengthCreator,
} from "../../../../../utils/validators/validators";

import styles from "./RecipeCreator.module.css";

const maxLength50 = maxLengthCreator(50);
const minLength3 = minLengthCreator(3);

const maxLength3000 = maxLengthCreator(3000);
const minLength80 = minLengthCreator(80);

const RecipeCreator = (props) => {
  useEffect(() => {
    props.initialize({
      title: props.initialTitle,
      description: props.initialDesc,
    });
  }, [props.title]);
  return (
    <div className={styles.creatorContainer}>
      <div>
        <form onSubmit={props.handleSubmit}>
          <h1>{props.title}</h1>
          <div>
            <span className={styles.helper}>{props.titleDesc}</span>
            <div>
              <Field
                placeholder="Title"
                name="title"
                component={Input}
                validate={[required, maxLength50, minLength3]}
              />
            </div>
            <span className={styles.helper}>{props.descriptionDesc}</span>
            <div>
              <Field
                placeholder="Description"
                name="description"
                component={Textarea}
                validate={[required, maxLength3000, minLength80]}
              />
            </div>
          </div>
          <div className={styles.shareRecipeButtonContainer}>
            <button className={styles.shareRecipeButton}>{props.button}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default reduxForm({ form: "addNewRecipe" })(RecipeCreator);
