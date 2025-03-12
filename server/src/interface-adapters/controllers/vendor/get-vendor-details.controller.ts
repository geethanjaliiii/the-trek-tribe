import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetVendorDetailsUsecase } from "../../../usecases/interface/vendor/IGetVendorDetails";
import { CustomRequest } from "../../middlewares/authentication.middleware";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/utils/constants";
import { CustomError } from "../../../shared/utils/CustomError";
import { ZodError } from "zod";

@injectable()
export class GetVendorDetailsController {
  constructor(
    @inject("IGetVendorDetailsUsecase")
    private getVendorDetails: IGetVendorDetailsUsecase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      console.log('hii vendor');
      
      const vendorId = (req as CustomRequest).user.id;
      const vendor = await this.getVendorDetails.execute(vendorId);
      res.status(HTTP_STATUS.OK).json({ success: true, vendor });
    } catch (error) {
      console.log(error,'error getting vendor details');
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
