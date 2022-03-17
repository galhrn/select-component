import React from "react";
import styles from "./empty-state.module.scss";
import magnify from "../../assets/img/magnify.png";
import { Strings } from "../../constants/string";

export const EmptyState = () => {
  return (
    <div className={styles.wrapper}>
      <img src={magnify} alt={Strings.NO_RESULTS} height={40} width={40} />
      <div className={styles.text}>{Strings.NO_RESULT_FOUND}</div>
    </div>
  );
};
