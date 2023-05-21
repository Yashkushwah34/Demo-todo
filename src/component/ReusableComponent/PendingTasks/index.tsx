import { useState } from "react";
import AntdCollapse from "../AntdCollapse";
import { useData } from "../../Context/dataContext";
import { Task } from "../../../typeDeclarations/apiResponse";

interface Props {
  pendingTasks: Task[] | null;
}

const PendingTasks = ({ pendingTasks }: Props) => {
  const [activeTabs, setActiveTabs] = useState<string[] | string>([]);

  const activeTabsHandler = (id: string[] | string) => {
    setActiveTabs(id);
  };

  return (
    <>
      <AntdCollapse
        tasks={pendingTasks}
        activeTabsHandler={activeTabsHandler}
        activeTabs={activeTabs}
      />
    </>
  );
};

export default PendingTasks;
