import React, { useState } from "react";

import { Button, Collapse } from "antd";
import { Task } from "../../../typeDeclarations/apiResponse";
import HeaderContent from "./AntdCollapseContent/Header";
import styles from "./antdCollapse.module.scss";
import PanelContainer from "./AntdCollapseContent/PanelContainer";
import { useData } from "../../Context/dataContext";
import TaskCreateModal from "../TaskCreateModal";

interface Props {
  tasks: Task[] | null;
  activeTabsHandler: (id: string[] | string) => void;
  activeTabs: string[] | string;
}

const AntdCollapse = ({ tasks, activeTabsHandler }: Props) => {
  const { Panel } = Collapse;

  const { taskData, setTaskData } = useData();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [taskId, setTaskId] = useState("");

  const taskDataHandler = (title: string) => {
    if (taskData) {
      if (taskData.length > 0) {
        const index = taskData.findIndex((el) => el.id === taskId);
        if (index > -1) {
          let subTaskList = [];
          const data = [...taskData];
          if (data[index].subTasks.length > 0) {
            const newSubTasks = [...data[index].subTasks];
            const newId = (newSubTasks.length + 1).toString();
            const obj = {
              id: newId,
              title: title,
              isCompleted: false,
            };
            newSubTasks.unshift(obj);
            subTaskList = [...newSubTasks];
          } else {
            const obj = {
              id: "1",
              title: title,
              isCompleted: false,
            };
            subTaskList.push(obj);
          }
          data[index].subTasks = subTaskList;
          setTaskData(data);
        }
      }
    }
  };

  const addSubtaskHandler = (id: string) => {
    setTaskId(id);
    setOpenModal(true);
  };

  return (
    <>
      <Collapse
        onChange={(e) => activeTabsHandler(e)}
        className={styles.mainContainer}
      >
        {tasks &&
          tasks.length > 0 &&
          tasks.map((el: Task, index) => {
            return (
              <Panel
                header={
                  <HeaderContent
                    title={el.title}
                    isCompleted={el.isCompleted}
                    id={el.id}
                    subTasks={el.subTasks}
                  />
                }
                key={el.id}
              >
                {el.isCompleted === false && (
                  <div className={styles.subtaskAddButton}>
                    <Button
                      type="primary"
                      onClick={() => addSubtaskHandler(el.id)}
                    >
                      Add Subtask
                    </Button>
                  </div>
                )}
                <ul>
                  {el.subTasks && el.subTasks.length > 0 ? (
                    el.subTasks.map((item, index) => {
                      return (
                        <li key={index}>
                          <PanelContainer
                            title={item.title}
                            isCompleted={item.isCompleted}
                            id={el.id}
                            subTaskId={item.id}
                          />
                        </li>
                      );
                    })
                  ) : (
                    <div className={styles.noTaskText}>
                      <img
                        src="/sipping.png"
                        alt="relax"
                        className={styles.imageContainer}
                      />
                      <h2>No Subtask To Show</h2>
                    </div>
                  )}
                </ul>
              </Panel>
            );
          })}
      </Collapse>
      <TaskCreateModal
        taskDataHandler={taskDataHandler}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default AntdCollapse;
