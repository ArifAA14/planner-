export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  emailVerified?: boolean;
}


export interface Tasks {
  id: string;
  task: string;
  user_id: string;
  completed: number | boolean;
  createdAt: string;
  dueDate: string | Date,
  description: string;
}


export interface NewTaskForm {
  task: string;
  description: string;
  dueDate: Date | string;
}