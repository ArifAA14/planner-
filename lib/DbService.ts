import { Tasks, User } from "@/types/types";
import { turso } from "./client";



class DbService {
  private static instance: DbService;

  private constructor() { }

  public static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }
    return DbService.instance;
  }

  // Method to create a new user in the database
  public async createUser(email: string, name: string, password: string, user_id: string) {
    const result = await turso.execute({
      sql: `INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?);`,
      args: [user_id, email, name, password],
    });

    if (result.rowsAffected === 0) {
      throw new Error("Failed to create user.");
    }

    return result;
  }

  public async getUserByEmail(email: string | unknown): Promise<User | null> {

    if (typeof email !== "string") {
      throw new Error("Invalid email");
    }

    const result = await turso.execute({
      sql: `SELECT * FROM users WHERE email = ?;`,
      args: [email],
    });

    if (result.rows.length === 0) {
      return null;
    }


    const userData = result.rows[0] as unknown as User;

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      emailVerified: userData.emailVerified,
    };
  }

  public async createTask(task: Tasks): Promise<{ success: boolean; message?: string }> {
    const result = await turso.execute({
      sql: `INSERT INTO tasks (id, task, user_id, createdAt, description, dueDate) VALUES (?, ?, ?, ?, ?, ?);`,
      args: [task.id, task.task, task.user_id, task.createdAt, task.description, task.dueDate],
    });

    if (result.rowsAffected === 0) {
      return { success: false, message: "Failed to create task." };
    }
    return { success: true, message: "Task created successfully." };
  }

  public async getTasks(userId: string): Promise<Tasks[] | null> {
    const result = await turso.execute({
      sql: `SELECT * FROM tasks WHERE user_id = ?;`,
      args: [userId],
    });

    if (result.rows.length === 0) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tasks = result.rows.map((row: any) => {
      return {
        id: row.id,
        task: row.task,
        user_id: row.user_id,
        completed: row.completed,
        createdAt: row.createdAt,
        dueDate: row.dueDate,
        description: row.description,
      };
    });

    return tasks;
  }

  public async setTaskCompleted(taskId: string, completed: number): Promise<{ success: boolean; message?: string }> {
    const result = await turso.execute({
      sql: `UPDATE Tasks SET completed = ? WHERE id = ?;`,
      args: [completed, taskId],
    });

    if (result.rowsAffected === 0) {
      return { success: false, message: "Failed to update task." };
    }
    return { success: true, message: "Task updated successfully." };
  }

  public async deleteTask(taskId: string): Promise<{ success: boolean; message?: string }> {
    const result = await turso.execute({
      sql: `DELETE FROM Tasks WHERE id = ?;`,
      args: [taskId],
    });

    if (result.rowsAffected === 0) {
      return { success: false, message: "Failed to delete task." };
    }
    return { success: true, message: "Task deleted successfully." };
  }

  public async updateTask(task: Tasks): Promise<{ success: boolean; message?: string }> {
    const result = await turso.execute({
      sql: `UPDATE Tasks SET task = ?, description = ?, dueDate = ? WHERE id = ?;`,
      args: [task.task, task.description, task.dueDate, task.id],
    });

    if (result.rowsAffected === 0) {
      return { success: false, message: "Failed to update task." };
    }
    return { success: true, message: "Task updated successfully." };
  }
}

export default DbService;
