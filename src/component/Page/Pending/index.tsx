import React from "react";

import PendingTasks from "../../ReusableComponent/PendingTasks";
import styles from "./pending.module.scss";
import { useData } from "../../Context/dataContext";

const Pending = () => {
  const { pendingTasks } = useData();

  return (
    <>
      <div className={styles.headingContainer}>
        <h1>Pending Tasks</h1>
      </div>
      {pendingTasks && pendingTasks.length > 0 ? (
        <PendingTasks pendingTasks={pendingTasks} />
      ) : (
        <>
          <div className={styles.imageContainer}>
            <img src="/todo.png" alt="todo " className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <h2>Nothing to show here </h2>
          </div>
        </>
      )}
    </>
  );
};

export default Pending;
