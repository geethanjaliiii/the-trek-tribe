import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { IVerifyOTPUseCase } from "../../../usecases/interface/auth/IVerifyOTPUseCase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from "../../../shared/utils/constants";
import { CustomError } from "../../../shared/utils/CustomError";

@injectable()
export class VerifyOTPController {
  constructor(@inject("IVerifyOTPUseCase") private verifyOTPUseCase: IVerifyOTPUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      console.log('otp',req.body);
      const { email, otp } = req.body;
      if (!email || !otp) {
        throw new CustomError(ERROR_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
      }
       
       
      await this.verifyOTPUseCase.execute(email, otp);
      console.log('hii');
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.OPERATION_SUCCESS,
      });
    } catch (error) {
      console.error('error in veriify otp',error);
      
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ success: false, message: error.message });
        return;
      }
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}