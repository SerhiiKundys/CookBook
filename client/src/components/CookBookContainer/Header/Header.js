import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header = ({ logout, login, isAuthorized }) => {
  console.log("render Header", isAuthorized);
  if (isAuthorized) {
    return (
      <div className={styles.header}>
        <Link to="/recipes">CookBook</Link>
        <div>
          <span>{login}</span>
          <Link to={"/login"} onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.header}>
        <Link to="/recipes">CookBook</Link>
        <Link to={"/login"}>Login</Link>
      </div>
    );
  }
};

export default Header;
