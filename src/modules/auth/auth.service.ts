import { pool } from "../../db";
import type { IUser } from "./auth.interface";
import bcrypt from "bcryptjs";

const signUpUserIntoDB = async (payload: IUser) => {
  const { email, password, name, role } = payload;
  // check if the user is already exists in database or not
  const isExists = await pool.query(
    `
        SELECT id, name, email, role, created_at, updated_at FROM users WHERE email=$1
        `,
    [email],
  );

  if (isExists.rowCount) {
    throw new Error("This email is already in use!");
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role) VALUES($1, $2, $3, COALESCE($4, 'contributor'))
    RETURNING id, name, email, role, created_at, updated_at
    `,
    [name, email, hashPassword, role],
  );

  return result;
};

export const authService = {
  signUpUserIntoDB,
};
