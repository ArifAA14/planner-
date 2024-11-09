"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function signinUser(formData: FormData): Promise<{ success: boolean; message?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
}