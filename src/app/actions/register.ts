"use server";
import { signIn } from "@/auth";
import DbService from "@/lib/DbService";
import { saltAndHashPassword } from "@/utils/password";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user_id = crypto.randomUUID();

  // Hash and salt the password
  const hashedPassword = await saltAndHashPassword(password);


  // Register the user
  const dbService = DbService.getInstance();

  await dbService.createUser(email, name, hashedPassword, user_id);

  // Sign in the user after registration
  await signIn("credentials", { email, password, redirect: false });

  // Redirect to the dashboard
  redirect("/");
}
