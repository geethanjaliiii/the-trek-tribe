import { inject, injectable } from "tsyringe";
import { IChangeUserStatusUsecase } from "../../../usecases/interface/admin/IChangeUserStatusUsecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/utils/constants";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { CustomError } from "../../../shared/utils/CustomError";

@injectable()
export class ChangeUserStatusController {
    constructor(
        @inject("IChangeUserStatusUsecase")
        private changeUserStatusUseCase: IChangeUserStatusUsecase
      ) {}
      async handle(req: Request, res: Response): Promise<void> {
        try {
            const { userType, userId } = req.body as {
              userType: string;
              userId: any;
            };
      
            console.log("user type => ", userType);
            console.log("user id => ", userId);
      
           await this.changeUserStatusUseCase.execute(userType, userId);
          console.log('status updated');
          
            res
              .status(HTTP_STATUS.OK)
              .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
          } catch (error) {
            console.log(error,'error updating status');
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
           
            res
              .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
              .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
          }
        }
    }
