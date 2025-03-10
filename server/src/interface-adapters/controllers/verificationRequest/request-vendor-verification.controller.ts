import { inject, injectable } from "tsyringe";
import { IRequestVerificationUsecase } from "../../../usecases/interface/vendor/IVerify-vendor-Usecase.interface";
import { CustomRequest } from "../../middlewares/authentication.middleware";
import { IVendor } from "../../../domain/entities/vendor.entity";
import { vendorVerificationnSchema } from "../../validations/vendor/vendorVerification-validation";
import { ObjectId } from "mongoose";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/utils/constants";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { CustomError } from "../../../shared/utils/CustomError";

@injectable()
export class RequestVerificationController {
  constructor(
    @inject("IRequestVerificationUsecase")
    private requestVerificationUsecase: IRequestVerificationUsecase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const vendorId = (req as CustomRequest).user.id;
      const data = req.body;

      const validatedData = await vendorVerificationnSchema.parse(data);
    
      await this.requestVerificationUsecase.execute(vendorId, validatedData);
      res
        .status(HTTP_STATUS.OK)
        .json({ message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS });
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
