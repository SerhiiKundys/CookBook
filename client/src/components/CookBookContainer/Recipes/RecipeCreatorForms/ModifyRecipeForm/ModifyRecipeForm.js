import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import RecipeCreatorForm from "../RecipeCreator/RecipeCreator";
import { postRecipe, fetchRecipe } from "../../../../../redux/actions/actions";
import { Preloader } from "../../../../common/Preloader/Preloader";

const ModifyRecipeForm = ({ postRecipe, token, match, fetchRecipe }) => {
  console.log("render ModifyRecipeForm");
  const [recipe, setRecipe] = useState(null);

  const history = useHistory();
  console.log(match.params.id);

  useEffect(() => {
    fetchRecipe(match.params.id).then((recipe) => {
      setRecipe(recipe);
    });
  }, [match.params.id]);

  const onModifyRecipeSubmit = async (formData) => {
    await postRecipe(
      { ...formData, recipeId: match.params.id },
      token,
      "modify"
    );
    history.push("/recipes");
  };

  /* Show form only when recipe is FETCHED */
  if (recipe) {
    return (
      <RecipeCreatorForm
        onSubmit={onModifyRecipeSubmit}
        token={token}
        title="Modify your recipe"
        initialTitle={recipe.title}
        initialDesc={recipe.description}
        titleDesc="What is the new title of your recipe?"
        descriptionDesc="Now describe the process of cooking step by step and note
    ingredients"
        button="Modify"
      />
    );
  } else {
    return <Preloader />;
  }
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  postRecipe,
  fetchRecipe,
})(ModifyRecipeForm);
