import {
  RECIPES_SET_FETCHING_IN_PROCESS,
  RECIPES_SET_SERVER_ERROR,
  RECIPES_SET_RECIPES,
  RECIPES_SET_DOCS_COUNT,
  RECIPES_SET_CURRENT_PAGE,
} from "../types/types";

const initialState = {
  recipes: [],
  currentPage: 1,
  docsCount: null,
  serverError: null,
  fetchingInProcess: false,
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPES_SET_SERVER_ERROR:
      return Object.assign({}, state, { serverError: action.serverError });
    case RECIPES_SET_FETCHING_IN_PROCESS:
      return Object.assign({}, state, {
        fetchingInProcess: action.fetchingInProcess,
      });
    case RECIPES_SET_RECIPES:
      return Object.assign({}, state, {
        recipes: action.recipes,
      });
    case RECIPES_SET_DOCS_COUNT:
      return Object.assign({}, state, {
        docsCount: action.docsCount,
      });
    case RECIPES_SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.newPage,
      });

    default:
      return state;
  }
};
