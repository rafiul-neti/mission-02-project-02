import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import decodeToken from "../utils/decodeToken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const authorize = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "unauthorized access!",
        });
      }

      const decoded = decodeToken(token as string, config.jwt_secret);

      const user = (
        await pool.query(
          `
        SELECT id, name, email, role, created_at, updated_at FROM users WHERE email=$1
        `,
          [decoded.email],
        )
      ).rows[0];

      if (!user) {
        sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "user not found!",
        });
      }

      if (roles.length && !roles.includes(user.role)) {
        sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "forbidden!",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorize;
