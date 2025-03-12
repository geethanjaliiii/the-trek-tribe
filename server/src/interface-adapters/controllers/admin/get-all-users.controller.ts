import { inject, injectable } from "tsyringe";
import { IGetAllUserUsecase } from "../../../usecases/interface/admin/IGetAllUserUsecase.interface";
import { Request, Response } from "express";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/utils/constants";
import { CustomError } from "../../../shared/utils/CustomError";
import { ZodError } from "zod";
@injectable()
export class GetAllUsersController {
  constructor(
    @inject("IGetAllUserUsecase") private getAllUserUsecase: IGetAllUserUsecase
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const { userType, page = 1, limit = 10, search = "" } = req.query;
      console.log('req recieved',userType);
      
      const pageNumber = Number(page);
      const pageSize = Number(limit);
      const userTypeString = typeof userType === "string" ? userType : "client";
      const searchTermstring = typeof search === "string" ? search : "";
      const { user, total } = await this.getAllUserUsecase.execute(
        userTypeString,
        pageNumber,
        pageSize,
        searchTermstring
      );
      console.log('user details fetched',user);
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.DATA_RETRIEVED,
        users: user,
        totalPages: total,
      });
    } catch (error) {
      console.error('error fetching users',error);
      
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
