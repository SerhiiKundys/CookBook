import React from "react";

import Loader from "react-loader-spinner";

import styles from "./Preloader.module.css";
import "../../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Preloader = () => {
  return (
    <div className={styles.preloaderContainer}>
      <Loader type="Oval" color="#2ab587" height={100} width={100} />
    </div>
  );
};
