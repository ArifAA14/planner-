'use server'
import DbService from "@/lib/DbService";
import { Tasks } from "@/types/types";


export async function createTask(task: Tasks): Promise<{ success: boolean; message?: string }> {
  try {
    const dbService = DbService.getInstance();
    return await dbService.createTask(task);

  } catch (error) {
    console.log(error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function getTasks(userId: string): Promise<{ success: boolean; message?: string; tasks: Tasks[] | null }> {
  try {
    const dbService = DbService.getInstance();
    const tasks = await dbService.getTasks(userId);

    return { success: true, tasks, message: "Tasks retrieved successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An unexpected error occurred", tasks: null };
  }
}


export async function setTaskCompleted(taskId: string, completed: number): Promise<{ success: boolean; message?: string }> {
  try {
    const dbService = DbService.getInstance();
    dbService.setTaskCompleted(taskId, completed);
    return { success: true, message: "Task completed successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function deleteTask(taskId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const dbService = DbService.getInstance();
    dbService.deleteTask(taskId);
    return { success: true, message: "Task deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

