import { inject, injectable } from "tsyringe";
import { IGoogleUseCase } from "../../../usecases/interface/auth/IGoogleUsecase.interface";
import { IGenerateTokenUseCase } from "../../../usecases/interface/auth/IGenerateTokenUsecase.interface";
import { Request, Response } from "express";
import { setAuthCookies } from "../../../shared/utils/cookieHelper";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/utils/constants";
import { CustomError } from "../../../shared/utils/CustomError";
import { ZodError } from "zod";

@injectable()
export class GoogleController {
  constructor(
    @inject("IGoogleUseCase") private googleUseCase: IGoogleUseCase,
    @inject("IGenerateTokenUseCase")
    private generateTokenUseCase: IGenerateTokenUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { credential, client_id, role } = req.body;

      const user = await this.googleUseCase.execute(
        credential,
        client_id,
        role
      );

      if (!user?._id || !user?.email || !user?.role) {
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

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors,
        });
        return;
      }
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      console.log(error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
