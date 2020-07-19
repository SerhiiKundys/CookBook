import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Recipe from "./Recipe/Recipe";
import Pagination from "./Pagination";
import { Preloader } from "../../common/Preloader/Preloader";

import styles from "./Recipes.module.css";

const Recipes = ({ isAuthorized, recipes, fetchingInProcess }) => {
  return (
    <div className={styles.recipesContainer}>
      {isAuthorized && (
        <div className={styles.addRecipeButton}>
          <Link to="/add">Add your recipe</Link>
        </div>
      )}
      {!fetchingInProcess ? (
        <div className={styles.recipesPostsContainer}>
          {recipes.map((recipe, i) => (
            <Recipe
              id={recipe._id}
              title={recipe.title}
              description={recipe.description}
              date={recipe.date}
              owner={recipe.owner}
              prevVersion={recipe.prevVersion}
              nextVersion={recipe.nextVersion}
              key={i}
            />
          ))}
        </div>
      ) : (
        <Preloader />
      )}

      <div style={{ flex: 1 }}></div>
      <Pagination />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes.recipes,
    fetchingInProcess: state.recipes.fetchingInProcess,
  };
}

export default connect(mapStateToProps, null)(Recipes);
