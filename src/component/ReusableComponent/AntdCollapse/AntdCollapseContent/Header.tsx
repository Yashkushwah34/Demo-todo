import React from "react";
import styles from "./header.module.scss";
import { IoIosDoneAll } from "react-icons/io";
import { IoIosAlert } from "react-icons/io";
import { TbSubtask } from "react-icons/tb";

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
        </div>
        <div className={styles.iconContainer}>
          {isCompleted ? (
            <IoIosDoneAll size={30} color="rgb(95, 230, 33)" />
          ) : (
            <IoIosAlert
              size={25}
              color="#ffa900"
              className={styles.pendingIcon}
              onClick={() => completeTaskHandler(id)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderContent;
