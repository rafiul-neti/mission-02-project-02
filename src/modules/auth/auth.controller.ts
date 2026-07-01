import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const signUpUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const result = await authService.signUpUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const { accessToken, refreshToken, user } =
      await authService.loginUserIntoDB(req.body);

    res.cookie("refreshToken", refreshToken, {
      secure: false, // in production, it will be ---> true
      httpOnly: true,
      sameSite: "lax",
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: { token: accessToken, user },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateNewAccessToken(
      req.cookies.refreshToken,
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "access token generation successful",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  signUpUser,
  loginUser,
  refreshToken,
};
