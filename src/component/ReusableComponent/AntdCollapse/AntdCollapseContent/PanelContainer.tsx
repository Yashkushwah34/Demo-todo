import styles from "./panelContainer.module.scss";

import { IoIosAlert } from "react-icons/io";
import { IoIosDoneAll } from "react-icons/io";
import { AntdProps } from "../../../../typeDeclarations/apiResponse";
import { useData } from "../../../Context/dataContext";

import { Tooltip } from "antd";

interface Props extends AntdProps {
  subTaskId: string;
}

const PanelContainer = ({
  title,
  isCompleted,
  id: taskId,
  subTaskId,
}: Props) => {
  const { completeSubTaskHandler } = useData();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h3>{title}</h3>
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
                onClick={() => completeSubTaskHandler(taskId, subTaskId)}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
};

export default PanelContainer;
