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
  completed: boolean;
  createdAt: string;
  dueDate: string;
}