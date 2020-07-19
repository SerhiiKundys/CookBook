import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import { Input } from "../../../../formsControl/formsControl";
import {
  maxLengthCreator,
  required,
  minLengthCreator,
} from "../../../../utils/validators/validators";

import styles from "../Auth.module.css";

const maxLength15 = maxLengthCreator(15);
const minLength3 = minLengthCreator(3);
const minLength5 = minLengthCreator(5);

console.log("render Register");
const Register = (props) => {
  return (
    <div className={styles.authContainer}>
      <form onSubmit={props.handleSubmit}>
        <h1>Sign up</h1>
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
          <div>
            <Field
              type="password"
              placeholder="Repeat password"
              name="repeatPassword"
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
            Sign up
          </button>
        </div>
        <div className={styles.anotherAuthContainer}>
          <p>or</p>
          <Link to={"/login"} onClick={props.resetServerErrors}>
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({ form: "register" })(Register);
