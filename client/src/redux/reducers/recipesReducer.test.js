import React from "react";
import { recipesReducer } from "./recipesReducer";
import {
  setCurrentPage,
  setDocsCount,
  setFetchingInProcess,
  setRecipes,
} from "../actions/actions";

const state = {
  recipes: [],
  currentPage: 1,
  docsCount: null,
  fetchingInProcess: false,
};

test("Change currentPage from any value (1 by default) to 5", () => {
  let action = setCurrentPage(5);
  let newState = recipesReducer(state, action);

  expect(newState.currentPage).toBe(5);
});

test("Change docsCount from null to 20", () => {
  let action = setDocsCount(20);
  let newState = recipesReducer(state, action);

  expect(newState.docsCount).toBe(20);
});

test("Change fetchingInProcess from false value to true", () => {
  let action = setFetchingInProcess(5);
  let newState = recipesReducer(state, action);

  expect(newState.fetchingInProcess).toBeTruthy();
});

test("Fill recipes empty array with 5 posts", () => {
  let action = setRecipes([
    { recipe: "data 1" },
    { recipe: "data 2" },
    { recipe: "data 3" },
    { recipe: "data 4" },
    { recipe: "data 5" },
  ]);
  let newState = recipesReducer(state, action);

  expect(newState.recipes.length).toBeGreaterThan(0);
});
