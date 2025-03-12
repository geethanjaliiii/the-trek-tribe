import { inject, injectable } from "tsyringe";
import { IForgetPasswordUsecase } from "../interface/auth/IForgetPasswordUsecase";
import { ICheckUserExistanceService } from "../../infrastructure/services/auth/ICheckUserExistance.interface";
import { IOTPService } from "../../infrastructure/services/otp/IOTPService.interface";
import { CustomError } from "../../shared/utils/CustomError";
import { EMAIL_SUBJECT, ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";
import { IEmailService } from "../../infrastructure/services/email/IEmailService.interface";

@injectable()
export class ForgetPasswordUsecase implements IForgetPasswordUsecase {
  constructor(
    @inject("ICheckUserExistanceService")
    private checkUserExistance: ICheckUserExistanceService,
    @inject("IOTPService") private otpService: IOTPService,
    @inject('IEmailService') private emailService:IEmailService
  ) {}

  async execute(email: string): Promise<void> {
    const emailExist = await this.checkUserExistance.emailExist(email);
    if(!emailExist){
        throw new CustomError(ERROR_MESSAGES.EMAIL_NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }
    const otp = await this.otpService.generateOTP(email);
    console.log('forgetOtp',otp);

    await this.emailService.sendEmail(
        email,
        EMAIL_SUBJECT,
        `Your OTP is: ${otp}. Expires in 10 minutes`
    );
    
  }
}
