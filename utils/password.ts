import bcrypt from "bcrypt";

// Salts and hashes the password
export const saltAndHashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

// Verifies a password against a stored hash
export const verifyPassword = async (password: string | unknown, hash: string | unknown): Promise<boolean> => {
  if (typeof password !== "string" || typeof hash !== "string") {
    throw new Error("Invalid password or hash");
  }
  return bcrypt.compareSync(password, hash);
};