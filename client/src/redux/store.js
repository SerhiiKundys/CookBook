import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { recipesReducer } from "./reducers/recipesReducer";
import { reducer as formReducer } from "redux-form";

let reducers = combineReducers({
  auth: authReducer,
  recipes: recipesReducer,
  form: formReducer,
});

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
