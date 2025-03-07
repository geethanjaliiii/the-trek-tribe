import { Request, Response } from "express";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { inject, injectable } from "tsyringe";
import { ILoginUserUseCase } from "../../../usecases/interface/auth/ILoginUserUsecase.interface";
import { IGenerateTokenUseCase } from "../../../usecases/interface/auth/IGenerateTokenUsecase.interface";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/utils/constants";
import { setAuthCookies } from "../../../shared/utils/cookieHelper";
import { ZodError } from "zod";
import { CustomError } from "../../../shared/utils/CustomError";

@injectable()
export class LoginController {
  constructor(
    @inject("ILoginUserUseCase") private loginUseCase: ILoginUserUseCase,
    @inject("IGenerateTokenUseCase")
    private generateTokenUseCase: IGenerateTokenUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const data = req.body as LoginUserDTO;
    const { email, password, role } = data;
    if (!email || !password || !role) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.MISSING_PARAMETERS,
      });
    }
    try {
      const user = await this.loginUseCase.execute(data);
      if (!user || !user._id || !user.email || !user.role) {
        throw new Error("User ID, email, or role is missing");
      }
      const userId = user._id.toString();
      const tokens = await this.generateTokenUseCase.excecute(
        userId,
        user.email,
        user.role
      );
      const accessTokenName = `${user.role}_access_token`;
      const refreshTokenName = `${user.role}_refresh_token`;

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName
      );
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.log("Error in login user", error);
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.SERVER_ERROR,
      });
    }
  }
}
