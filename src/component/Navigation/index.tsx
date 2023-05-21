import React, { useEffect, useState } from "react";
import styles from "./navigationBar.module.scss";
import { useUser } from "../Context/userContext";
import { Button } from "antd";
import { useData } from "../Context/dataContext";
import TaskCreateModal from "../ReusableComponent/TaskCreateModal";

const NavigationBar = () => {
  const { response, getUser } = useUser();
  const { taskData, setTaskData } = useData();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, getUser]);

  const taskDataHandler = (title: string) => {
    if (taskData) {
      if (taskData.length > 0) {
        const idNumber = (taskData.length + 1).toString();
        const obj = {
          id: idNumber,
          title: title,
          isCompleted: false,
          subTasks: [],
        };
        const data = [...taskData];
        data.unshift(obj);
        setTaskData(data);
      } else {
        const obj = [
          {
            id: "1",
            title: title,
            isCompleted: false,
            subTasks: [],
          },
        ];
        setTaskData(obj);
      }
    } else {
      const obj = [
        {
          id: "1",
          title: title,
          isCompleted: false,
          subTasks: [],
        },
      ];
      setTaskData(obj);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Create Task
          </Button>
        </div>
        {response && response.name && (
          <div className={styles.iconContainer}>
            <h3>{response.name[0].toUpperCase()}</h3>
          </div>
        )}
      </div>
      <TaskCreateModal
        taskDataHandler={taskDataHandler}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default NavigationBar;
