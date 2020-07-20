import React from "react";
import { Field, reduxForm } from "redux-form";

import { Input } from "../../../../formsControl/formsControl";
import { Link } from "react-router-dom";
import {
  maxLengthCreator,
  required,
  minLengthCreator,
} from "../../../../utils/validators/validators";

import styles from "../Auth.module.css";

const maxLength15 = maxLengthCreator(15);
const minLength3 = minLengthCreator(3);
const minLength5 = minLengthCreator(5);

const Login = (props) => {
  return (
    <div className={styles.authContainer}>
      <form onSubmit={props.handleSubmit}>
        <h1>Sign in</h1>
        <div className={styles.inputDataContainer}>
          <div>
            <Field
              placeholder="Login"
              name="login"
              component={Input}
              validate={[required, maxLength15, minLength3]}
            />
          </div>
          <div>
            <Field
              type="password"
              placeholder="Password"
              name="password"
              component={Input}
              validate={[required, maxLength15, minLength5]}
            />
          </div>
        </div>
        <div className={styles.checkboxContainer}>
          <label>
            <Field type="checkbox" name="rememberMe" component="input" />
            remember me
          </label>
        </div>
        {props.serverError && (
          <div className={styles.serverError}>
            <span>{props.serverError}</span>
          </div>
        )}
        <div>
          <button disabled={props.authInProcess} className={styles.authButton}>
            Sign in
          </button>
        </div>
        <div className={styles.anotherAuthContainer}>
          <p>or</p>
          <Link to={"/register"} onClick={props.resetServerErrors}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({ form: "login" })(Login);
