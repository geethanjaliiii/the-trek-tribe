import { inject, injectable } from "tsyringe";
import { IRegisterUserUseCase } from "../../../usecases/interface/auth/IRegisterUserUseCase.interface";
import { Request, Response } from "express";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { userSchemas } from "../../validations/auth/user-signup-validation.schema";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES, UserRoles } from "../../../shared/utils/constants";
import { ZodError } from "zod";
import { CustomError } from "../../../shared/utils/CustomError";

@injectable()
export class SendEmailController{
  constructor(
    @inject("IRegisterUserUseCase")
    private registerUserUseCase: IRegisterUserUseCase
  ) {}

  async handle(req:Request, res:Response): Promise<void> {
    try {
        const {role} = req.body as UserDTO;
        
        console.log(role)
        const schema =userSchemas[role as keyof typeof userSchemas]
        if(!schema) {
          res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: ERROR_MESSAGES.INVALID_CREDENTIALS,
          })
          return;
        }

        const validatedData = schema.parse(req.body) as UserDTO

        await this.registerUserUseCase.execute(validatedData);

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
        console.error('Error in register',error)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({success:false, message: ERROR_MESSAGES.SERVER_ERROR})
    }
  }
}
