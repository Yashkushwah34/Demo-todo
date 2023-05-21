export interface ApiResponse {
  name: string;
  email: string;
  password: string;
  token: string;
  id: string;
}

export interface DashboardCountData {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

export interface SubTask {
  id: string;
  isCompleted: boolean;
  title: string;
}

export interface Task {
  id: string;
  isCompleted: boolean;
  title: string;
  subTasks: SubTask[] | [];
}

export interface AntdProps {
  isCompleted: boolean;
  title: string;
  id: string;
}
