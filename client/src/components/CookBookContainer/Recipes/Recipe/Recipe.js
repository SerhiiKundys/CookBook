import React from "react";
import { Link } from "react-router-dom";

import styles from "./Recipe.module.css";

const Recipe = ({ id, title, description, date }) => {
  return (
    <div className={styles.recipeContainer}>
      <div className={styles.titleContainer}>
        <h3>{title.length > 29 ? title.slice(0, 30) + "..." : title}</h3>
      </div>

      <div className={styles.descriptionContainer}>
        <p>{description}</p>
      </div>

      <div className={styles.readRecipeButton}>
        <Link
          to={{
            pathname: `/recipes/${id}`,
          }}
        >
          More
        </Link>
        <span>{date.slice(0, 10)}</span>
      </div>
    </div>
  );
};

export default Recipe;
