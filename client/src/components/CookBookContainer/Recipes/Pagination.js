import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setCurrentPage } from "../../../redux/actions/actions";

import styles from "./Recipes.module.css";

const Pagination = ({ docsCount, currentPage, setCurrentPage }) => {
  console.log("render Pagination");
  const [pagesCount, setPagesCount] = React.useState(Math.ceil(docsCount / 9));
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    setPagesCount(Math.ceil(docsCount / 9));
  }, [docsCount]);

  return (
    <div className={styles.paginationContainer}>
      {currentPage > 1 && (
        <span className={styles.paginationButton} onClick={prevPage}>
          prev
        </span>
      )}
      <span className={styles.currentPage}>{currentPage}</span>
      {currentPage < pagesCount && (
        <span className={styles.paginationButton} onClick={nextPage}>
          next
        </span>
      )}
    </div>
  );
};

const MapStateToProps = (state) => ({
  docsCount: state.recipes.docsCount,
  currentPage: state.recipes.currentPage,
});

export default connect(MapStateToProps, { setCurrentPage })(Pagination);
