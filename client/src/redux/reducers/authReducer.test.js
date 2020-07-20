import React from "react";
import { authReducer } from "./authReducer";
import {
  setAuthInProcess,
  setUserAuth,
  setServerError,
} from "../actions/actions";

let state = {
  login: null,
  id: null,
  token: null,
  isAuthenticated: false,
  serverError: "error message",
  authInProcess: true,
};

test("Change authInProcess from true to false", () => {
  let action = setAuthInProcess(false);
  let newState = authReducer(state, action);

  expect(newState.authInProcess).toBeFalsy();
});

test("Change serverError from 'error message' to null", () => {
  let action = setServerError(null);
  let newState = authReducer(state, action);

  expect(newState.serverError).toBeNull();
});

test("Set auth data", () => {
  let action = setUserAuth({
    login: "user",
    id: "57fg45hj454jfg",
    isAuthenticated: true,
    token: "jkdfgndfvjkfdvnfgb",
  });
  let newState = authReducer(state, action);

  expect({
    login: newState.login,
    id: newState.id,
    token: newState.token,
    isAuthenticated: newState.isAuthenticated,
  }).toStrictEqual({
    login: "user",
    id: "57fg45hj454jfg",
    token: "jkdfgndfvjkfdvnfgb",
    isAuthenticated: true,
  });
});
