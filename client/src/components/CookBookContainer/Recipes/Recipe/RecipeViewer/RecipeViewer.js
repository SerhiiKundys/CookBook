import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchRecipe } from "../../../../../redux/actions/actions";
import { Preloader } from "../../../../common/Preloader/Preloader";

import styles from "./RecipeViewer.module.css";

const RecipeViewer = ({ userId, match, fetchRecipe }) => {
  console.log("render RecipeViewer");
  const [recipe, setRecipe] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    fetchRecipe(match.params.id).then((recipe) => {
      const date = new Date(recipe.date);

      setDate(`${date.getHours()}:${date.getMinutes()} 
      ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);

      setRecipe(recipe);
    });
  }, [match.params.id]);

  if (!!recipe) {
    return (
      <div className={styles.recipeViewerContainer}>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <span>{date}</span>
        {recipe.owner === userId && (
          <div className={styles.modifyRecipeButton}>
            {/* If it is the latest version of recipe
            you can go to the previous and or can modify current (latest)
             */}
            {!recipe.nextVersion && (
              <Link
                to={{
                  pathname: `/modify/${recipe._id}`,
                }}
              >
                Modify recipe
              </Link>
            )}

            {/* If previous version of recipe exist you can go to it */}
            {recipe.prevVersion && (
              <Link to={`/recipes/${recipe.prevVersion}`}>
                Previous version
              </Link>
            )}

            {/* If it is NOT the latest version, you can't modify it.
            If next version of recipe exist you can go to it */}
            {recipe.nextVersion && (
              <Link to={`/recipes/${recipe.nextVersion}`}>Next version</Link>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return <Preloader />;
  }
};

const mapStateToProps = (state) => ({
  userId: state.auth.id,
});

export default connect(mapStateToProps, { fetchRecipe })(RecipeViewer);
