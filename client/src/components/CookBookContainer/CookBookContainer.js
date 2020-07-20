import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  logout,
  authUser,
  setServerError,
  fetchRecipes,
} from "../../redux/actions/actions";
import Header from "./Header/Header";
import Recipes from "./Recipes/Recipes";
import RecipeViewer from "./Recipes/Recipe/RecipeViewer/RecipeViewer";
import AddRecipeForm from "./Recipes/RecipeCreatorForms/AddRecipeForm/AddRecipeForm";
import ModifyRecipeForm from "./Recipes/RecipeCreatorForms/ModifyRecipeForm/ModifyRecipeForm";
import Login from "./AuthContainer/Login/Login";
import Register from "./AuthContainer/Register/Register";

const CookBookContainer = ({
  logout,
  login,
  token,
  authUser,
  authInProcess,
  serverError,
  setServerError,
  fetchRecipes,
  currentPage,
}) => {
  useEffect(() => {
    fetchRecipes(currentPage);
  }, [fetchRecipes, currentPage]);

  const onRegisterSubmit = async (formData) => {
    await authUser(formData, "register");
  };

  const onLoginSubmit = async (formData) => {
    await authUser(formData, "login");
  };

  const resetServerErrors = () => {
    setServerError(null);
  };

  return (
    <div>
      <Header isAuthorized={!!token} logout={logout} login={login} />
      <div>
        <Switch>
          <Route path="/recipes" exact>
            <Recipes isAuthorized={!!token} />
          </Route>
          <Route path="/recipes/:id" component={RecipeViewer} exact />
          <Route path="/add" exact>
            <AddRecipeForm token={token} />
          </Route>
          <Route path="/modify/:id" component={ModifyRecipeForm} exact />

          {!token && (
            <React.Fragment>
              <Route path="/login" exact>
                <Login
                  onSubmit={onLoginSubmit}
                  authInProcess={authInProcess}
                  serverError={serverError}
                  resetServerErrors={resetServerErrors}
                />
              </Route>
              <Route path="/register" exact>
                <Register
                  onSubmit={onRegisterSubmit}
                  authInProcess={authInProcess}
                  serverError={serverError}
                  resetServerErrors={resetServerErrors}
                />
              </Route>
            </React.Fragment>
          )}

          <Redirect to="/recipes" />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    token: state.auth.token,
    authInProcess: state.auth.authInProcess,
    serverError: state.auth.serverError,
    currentPage: state.recipes.currentPage,
  };
};

export default connect(mapStateToProps, {
  logout,
  authUser,
  setServerError,
  fetchRecipes,
})(CookBookContainer);
