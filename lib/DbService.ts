import { User } from "@/types/types";
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

  // Method to retrieve a user from the database
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userData = result.rows[0] as any;

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      emailVerified: userData.emailVerified,
    };
  }
}

export default DbService;
