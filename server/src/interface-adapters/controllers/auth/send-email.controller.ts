import { inject, injectable } from "tsyringe";
import { IRegisterUserUseCase } from "../../../usecases/interface/auth/IRegisterUserUseCase.interface";
import { Request, Response } from "express";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { userSchemas } from "../../validations/auth/user-signup-validation.schema";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES, UserRoles } from "../../../shared/utils/constants";
import { ZodError } from "zod";
import { CustomError } from "../../../shared/utils/CustomError";
import { SendEmailUsecase } from "../../../usecases/auth/send-email.usecase";
import { ISendEmailUseCase } from "../../../usecases/interface/auth/ISendEmailUsecase.interface";

@injectable()
export class SendEmailController{
  constructor(
   @inject("ISendEmailUseCase") private sendEmailUseCase :ISendEmailUseCase
  ) {}

  async handle(req:Request, res:Response): Promise<void> {
    try {
        const {role, email} = req.body as UserDTO;
        
        console.log(req.body, 'email controller response')
        const schema =userSchemas[role as keyof typeof userSchemas]
        if(!schema) {
          res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: ERROR_MESSAGES.INVALID_CREDENTIALS,
          })
          return;
        }
        schema.parse(req.body);
        await this.sendEmailUseCase.execute(email);

        res.status(HTTP_STATUS.OK).json({
          success: true,
          message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS})
    } catch (error) {
        if(error instanceof ZodError) {
          const errors = error.errors.map((err)=>({
            message: err.message
          }))

          res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message:ERROR_MESSAGES.VALIDATION_ERROR,
            errors
          })
          return;

        }
        if(error instanceof CustomError){
          res.status(error.statusCode).json({
            success: false,
            message: error.message
          })
          return;
        }
        console.error('Error in sending email',error)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({success:false, message: ERROR_MESSAGES.SERVER_ERROR})
    }
  }
}
