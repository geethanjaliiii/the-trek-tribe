import { inject,injectable } from "tsyringe";
import { IRegisterStrategy } from "../interface/auth/IRegisterStrategy.interface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";
import { IVerifyOTPUseCase } from "../interface/auth/IVerifyOTPUseCase.interface";
import { IOTPService } from "../../infrastructure/services/otp/IOTPService.interface";
import { IJWTService } from "../../infrastructure/services/jwt/IJWTService.interface";


@injectable()
export class VerifyOTPUseCase implements IVerifyOTPUseCase {
    constructor(
        @inject("IOTPService") private otpService: IOTPService,
    ){}
   async execute(email: string, otp: string): Promise<boolean | void> {
        const isValid = await this.otpService.verifyOTP(email, otp)
        if(!isValid){
            throw new CustomError("Invalid or expired OTP",HTTP_STATUS.BAD_REQUEST)
        }
       console.log('validity',isValid);
    }
}
