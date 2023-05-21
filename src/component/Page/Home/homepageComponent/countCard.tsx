import React from "react";
import styles from "./countCard.module.scss";

interface countCardProps {
  count: number;
  text: string;
}

const CountCard = ({ count, text }: countCardProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.countText}>
          <h2>{count}</h2>
        </div>
        <div className={styles.text}>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default CountCard;
