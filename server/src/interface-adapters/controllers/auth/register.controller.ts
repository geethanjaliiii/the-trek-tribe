import { inject, injectable } from "tsyringe";
import { IRegisterUserUseCase } from "../../../usecases/interface/auth/IRegisterUserUseCase.interface";
import { Request, Response } from "express";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { userSchemas } from "../../validations/auth/user-signup-validation.schema";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/utils/constants";
import { CustomError } from "../../../shared/utils/CustomError";
import { ZodError } from "zod";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { GenerateTokenUseCase } from "../../../usecases/auth/generate-token.useCase";
import { IGenerateTokenUseCase } from "../../../usecases/interface/auth/IGenerateTokenUsecase.interface";

@injectable()
export class RegisterUserController {
  constructor(
    @inject("IRegisterUserUseCase")
    private registerUserUseCase: IRegisterUserUseCase,
    @inject("IGenerateTokenUseCase")
    private generateTokenUseCase: IGenerateTokenUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<IBaseUser | void> {
    try {
      const { role } = req.body as UserDTO;
      const schema = userSchemas[role as keyof typeof userSchemas];
      if (!schema) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
        return;
      }

      const validatedData = schema.parse(req.body) as UserDTO;
      const user = await this.registerUserUseCase.execute(validatedData);
      if (!user || !user._id || !user.email || !user.role) {
        throw new Error("User ID, email, or role is missing");
      }
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
      });

      const userId = user._id.toString();
      const tokens = await this.generateTokenUseCase.excecute(
        userId,
        user.email,
        user.role
      );


    } catch (error) {
      console.log("error in reg", error);

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
