import {
  AUTH_SET_SERVER_ERROR,
  AUTH_SET_AUTH_IN_PROCESS,
  AUTH_SET_USER_AUTH,
  RECIPES_SET_FETCHING_IN_PROCESS,
  RECIPES_SET_RECIPES,
  RECIPES_SET_DOCS_COUNT,
  RECIPES_SET_CURRENT_PAGE,
} from "../types/types";

import { requestAPI } from "../../api/requestApi";

/* AUTH */

export const setAuthInProcess = (authInProcess) => ({
  type: AUTH_SET_AUTH_IN_PROCESS,
  authInProcess,
});

export const authUser = (formData, url) => async (dispatch) => {
  try {
    dispatch(setAuthInProcess(true));
    const data = await requestAPI.request(`/api/auth/${url}`, "POST", {
      ...formData,
    });
    dispatch(
      setUserAuth({
        login: data.login,
        id: data.userId,
        isAuthenticated: true,
        token: data.token,
      })
    );
    if (formData.rememberMe) {
      localStorage.setItem(
        "cookBookUserData",
        JSON.stringify({
          userId: data.userId,
          token: data.token,
          login: data.login,
        })
      );
    }

    dispatch(setAuthInProcess(false));
    dispatch(setServerError(null));
  } catch (e) {
    dispatch(setServerError(e.message));
    setTimeout(() => dispatch(setServerError(null)), 4000);
    console.error(e.message);
    dispatch(setAuthInProcess(false));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("cookBookUserData");
  dispatch(
    setUserAuth({
      login: null,
      id: null,
      isAuthenticated: false,
      token: null,
    })
  );
};

export const setUserAuth = (userData) => ({
  type: AUTH_SET_USER_AUTH,
  userData,
});

export const setServerError = (err) => ({
  type: AUTH_SET_SERVER_ERROR,
  serverError: err,
});

/* RECIPES */

export const setFetchingInProcess = (fetchingInProcess) => ({
  type: RECIPES_SET_FETCHING_IN_PROCESS,
  fetchingInProcess,
});

export const setRecipes = (recipes) => ({
  type: RECIPES_SET_RECIPES,
  recipes,
});

export const setDocsCount = (docsCount) => ({
  type: RECIPES_SET_DOCS_COUNT,
  docsCount,
});

export const setCurrentPage = (newPage) => ({
  type: RECIPES_SET_CURRENT_PAGE,
  newPage,
});

export const postRecipe = (formData, token, url) => async (dispatch) => {
  try {
    dispatch(setFetchingInProcess(true));
    await requestAPI.request(
      `/api/recipes/${url}`,
      "POST",
      {
        ...formData,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    dispatch(setFetchingInProcess(false));
    dispatch(setServerError(null));
  } catch (e) {
    dispatch(setServerError(e.message));
    console.error(e.message);
    dispatch(setFetchingInProcess(false));
  }
};

export const fetchRecipes = (page) => async (dispatch) => {
  try {
    dispatch(setFetchingInProcess(true));

    const fetchedRecipes = await requestAPI.request(
      `/api/recipes/${page}`,
      "GET",
      null
    );

    dispatch(setRecipes(fetchedRecipes.recipes));

    dispatch(setDocsCount(fetchedRecipes.docsCount));

    dispatch(setFetchingInProcess(false));
  } catch (e) {
    dispatch(setServerError(e.message));
    console.error(e.message);
    dispatch(setFetchingInProcess(false));
  }
};

export const fetchRecipe = (id) => async (dispatch) => {
  try {
    dispatch(setFetchingInProcess(true));

    const fetchedRecipe = await requestAPI.request(
      `/api/recipes/recipe/${id}`,
      "GET",
      null
    );

    dispatch(setFetchingInProcess(false));
    dispatch(setServerError(null));
    return fetchedRecipe;
  } catch (e) {
    dispatch(setServerError(e.message));
    console.error(e.message);
    dispatch(setFetchingInProcess(false));
  }
};
