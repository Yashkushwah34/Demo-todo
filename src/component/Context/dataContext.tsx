import React, { createContext, useContext, useState, useEffect } from "react";

import {
  Task,
  DashboardCountData,
  SubTask,
} from "../../typeDeclarations/apiResponse";
import { toast } from "react-toastify";

type DataContextType = {
  taskData: Task[] | null;
  setTaskData: React.Dispatch<React.SetStateAction<Task[] | null>>;
  completedTasks: Task[] | null;
  pendingTasks: Task[] | null;
  count: DashboardCountData | null;
  setCount: React.Dispatch<React.SetStateAction<DashboardCountData | null>>;
  completeTaskHandler: (id: string) => void;
  completeSubTaskHandler: (taskId: string, subTaskId: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [taskData, setTaskData] = useState<Task[] | null>(null);
  const [count, setCount] = useState<DashboardCountData | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Task[] | null>(null);
  const [pendingTasks, setPendingTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    if (taskData && taskData.length > 0) {
      getCount();
    }
  }, [taskData]);

  const getCount = () => {
    const totalTasks = taskData?.length || 0;
    const completedTasks = taskData?.filter((el) => el.isCompleted === true);
    const completedCount = completedTasks?.length || 0;
    const pendingTasks = taskData?.filter((el) => el.isCompleted === false);
    const pendingCount = pendingTasks?.length || 0;

    setCompletedTasks(completedTasks || null);
    setPendingTasks(pendingTasks || null);

    const obj = {
      totalTasks: totalTasks,
      pendingTasks: pendingCount,
      completedTasks: completedCount,
    };
    setCount(obj);
  };

  const completeTaskHandler = (id: string) => {
    if (taskData) {
      const data = [...taskData];
      const index = data.findIndex((el) => el.id === id);
      if (index > -1) {
        data[index].isCompleted = true;
        if (data[index].subTasks.length > 0) {
          data[index].subTasks.forEach((el) => (el.isCompleted = true));
        }
        setTaskData(data);
      } else {
        toast.error("Unknown Id Please try again later");
      }
    }
  };

  const completeSubTaskHandler = (taskId: string, subTaskId: string) => {
    if (taskData) {
      const data = [...taskData];
      const index = data.findIndex((el) => el.id === taskId);
      if (index > -1) {
        if (data[index].subTasks && data[index].subTasks?.length > 0) {
          const subTaskIndex = data[index].subTasks.findIndex(
            (el) => el.id === subTaskId
          );
          if (subTaskIndex > -1) {
            data[index].subTasks[subTaskIndex].isCompleted = true;
            const checkSubTask = checkIfAllSubtaskCompleted(
              data[index].subTasks
            );
            if (checkSubTask) {
              data[index].isCompleted = true;
            }
            setTaskData(data);
          } else {
            toast.error("Unknown Id Please try again later");
          }
        } else {
          toast.error("Unknown Id Please try again later");
        }
      } else {
        toast.error("Unknown Id Please try again later");
      }
    }
  };

  const checkIfAllSubtaskCompleted = (data: SubTask[]) => {
    const index = data.findIndex((el) => el.isCompleted === false);
    if (index > -1) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <DataContext.Provider
      value={{
        taskData,
        setTaskData,
        count,
        setCount,
        completedTasks,
        pendingTasks,
        completeTaskHandler,
        completeSubTaskHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};
