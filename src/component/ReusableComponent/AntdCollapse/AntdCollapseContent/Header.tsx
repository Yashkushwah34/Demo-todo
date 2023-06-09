import React from "react";
import styles from "./header.module.scss";
import { IoIosDoneAll } from "react-icons/io";
import { IoIosAlert } from "react-icons/io";
import { TbSubtask } from "react-icons/tb";
import { Tooltip } from "antd";

import { AntdProps, SubTask } from "../../../../typeDeclarations/apiResponse";
import { useData } from "../../../Context/dataContext";

interface Props extends AntdProps {
  subTasks: SubTask[] | [];
}

const HeaderContent = ({ title, isCompleted, id, subTasks }: Props) => {
  const { completeTaskHandler } = useData();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h2>{title}</h2>
          {subTasks.length > 0 && <TbSubtask size={15} />}
          {subTasks.length > 0 && <div>{subTasks.length}</div>}
        </div>
        <div className={styles.iconContainer}>
          {isCompleted ? (
            <Tooltip title="Task Completed">
              <IoIosDoneAll size={30} color="rgb(95, 230, 33)" />
            </Tooltip>
          ) : (
            <Tooltip title="Click to Complete Task">
              <IoIosAlert
                size={25}
                color="#ffa900"
                className={styles.pendingIcon}
                onClick={() => completeTaskHandler(id)}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderContent;
