export enum ExpenseCategory {
  Food = "Food",
  Transport = "Transport",
  Entertainment = "Entertainment",
  Others = "Others",
}

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
}


export enum TaskStatus {
  Completed = "completed",
  Pending = "pending"
}

export enum TaskType {
  Home = "home",
  Work = "work",
  Urgent = "urgent"
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdDate: Date;
  status: TaskStatus;
  type: TaskType;
}

export interface DeadlineTask extends Task {
  deadline: Date;
}

export interface AssignedTask extends Task {
  assignee: string;
}

export interface LocationTask extends Task {
  location: string;
}
