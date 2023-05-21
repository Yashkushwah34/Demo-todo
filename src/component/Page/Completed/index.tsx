import React from "react";

import { useState } from "react";
import AntdCollapse from "../../ReusableComponent/AntdCollapse/index";
import { useData } from "../../Context/dataContext";

import styles from "./completed.module.scss";

const Completed = () => {
  const { completedTasks } = useData();

  const [activeTabs, setActiveTabs] = useState<string[] | string>([]);

  const activeTabsHandler = (id: string[] | string) => {
    setActiveTabs(id);
  };

  return (
    <>
      <div className={styles.headingContainer}>
        <h1>Completed Tasks</h1>
      </div>
      {completedTasks && completedTasks.length > 0 ? (
        <AntdCollapse
          tasks={completedTasks}
          activeTabsHandler={activeTabsHandler}
          activeTabs={activeTabs}
        />
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

export default Completed;
