import { inject, injectable } from "tsyringe";
import { IForgetPasswordUsecase } from "../../../usecases/interface/auth/IForgetPasswordUsecase";
import { Request, Response } from "express";

import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/utils/constants";
import { CustomError } from "../../../shared/utils/CustomError";

@injectable()
export class ForgetPasswordController {
  constructor(
    @inject("IForgetPasswordUsecase")
    private forgetPasswordUsecase: IForgetPasswordUsecase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({
            success: false,
            message: ERROR_MESSAGES.INVALID_CREDENTIALS,
          });
        return;
      }
      await this.forgetPasswordUsecase.execute(email);
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS });
    } catch (error) {
      console.log("Error in forget password", error);
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
