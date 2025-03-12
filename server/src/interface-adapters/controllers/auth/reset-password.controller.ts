import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IResetPasswordUsecase } from "../../../usecases/interface/auth/IResetPasswordUsecase.interface";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/utils/constants";

@injectable()
export class ResetPasswordController {
    constructor(@inject('IResetPasswordUsecase') private resetPasswordUsecase:IResetPasswordUsecase){}
    async handle(req:Request, res:Response):Promise<void>{
      try {
        const{email, role, password}=req.body;
        if(!email || !role ||!password){
           res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }
        await this.resetPasswordUsecase.execute(email, password,role)
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS
        })
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