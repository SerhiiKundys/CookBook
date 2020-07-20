import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import RecipeCreatorForm from "../RecipeCreator/RecipeCreator";
import { postRecipe, fetchRecipes } from "../../../../../redux/actions/actions";

const AddRecipeForm = ({ postRecipe, token, fetchRecipes, currentPage }) => {
  const history = useHistory();
  const onCreateRecipeSubmit = async (formData) => {
    await postRecipe(formData, token, "add");
    fetchRecipes(currentPage);
    history.push("/recipes");
  };

  return (
    <RecipeCreatorForm
      onSubmit={onCreateRecipeSubmit}
      token={token}
      title="Share your recipe"
      initialTitle=""
      titleDesc="What is the title of your recipe?"
      initialDesc=""
      descriptionDesc="Now describe the process of cooking step by step and note
      ingredients"
      button="Share"
    />
  );
};

const mapStateToProps = (state) => ({
  currentPage: state.recipes.currentPage,
});

export default connect(mapStateToProps, {
  postRecipe,
  fetchRecipes,
})(AddRecipeForm);
