import config from "../../config";
import { pool } from "../../db";
import generateToken from "../../utils/generateToken";
import type { IUser } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";

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

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  //   check if the user is exists or not
  const isExists = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (!isExists.rowCount) {
    throw new Error("Invalid credentials!");
  }

  const { password: userPassword, ...user } = isExists.rows[0];
  //   check if the password matches or not
  const isPassMatched = await bcrypt.compare(password, userPassword);

  if (!isPassMatched) {
    throw new Error("Invalid credentials!");
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // console.log(user);
  const accessToken = generateToken(
    jwtpayload,
    config.jwt_secret,
    config.access_token_expires_in,
  );

  const refreshToken = generateToken(
    jwtpayload,
    config.jwt_refresh_secret,
    config.refresh_token_expires_in,
  );

  return { accessToken, refreshToken, user };
};

const 

export const authService = {
  signUpUserIntoDB,
  loginUserIntoDB,
};
