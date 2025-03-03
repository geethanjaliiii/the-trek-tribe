import { inject, injectable } from "tsyringe";
import { CustomError } from "../../shared/utils/CustomError";
import {
  EMAIL_SUBJECT,
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../shared/utils/constants";
import { IEmailService } from "../../infrastructure/services/email/IEmailService.interface";
import { IOTPService } from "../../infrastructure/services/otp/IOTPService.interface";
import { ISendEmailUseCase } from "../interface/auth/ISendEmailUsecase.interface";
import { ICheckUserExistanceService } from "../../infrastructure/services/auth/ICheckUserExistance.interface";

@injectable()
export class SendEmailUsecase implements ISendEmailUseCase {
  constructor(
    @inject("IEmailService") private emailService: IEmailService,
    @inject("IOTPService") private otpService: IOTPService,
    @inject("ICheckUserExistanceService")private checkExistance: ICheckUserExistanceService
  ) {}
  async execute(email: string): Promise<void> {
    const emailAlreadyExist = await this.checkExistance.emailExist(email);
    if (emailAlreadyExist) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const otp = await this.otpService.generateOTP(email);
    await this.emailService.sendEmail(
      email,
      EMAIL_SUBJECT,
      `Your OTP is: ${otp}. Expires in 10 minutes`
    );
  }
}

