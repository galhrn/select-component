import React from "react";
import styles from "./select-item.module.scss";

export const SelectItem = ({ item, selected, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.label} ${selected && styles.selected}`}
        onClick={() => onClick(item)}
      >
        {item.label}
      </div>
    </div>
  );
};
