import { inject,injectable } from "tsyringe";
import { IRegisterStrategy } from "../interface/auth/IRegisterStrategy.interface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";
import { IVerifyOTPUseCase } from "../interface/auth/IVerifyOTPUseCase.interface";
import { IOTPService } from "../../infrastructure/services/otp/IOTPService.interface";


@injectable()
export class VerifyOTPUseCase implements IVerifyOTPUseCase {
    private strategies: Record<string, IRegisterStrategy>;

    constructor(
        @inject("IOTPService") private otpService: IOTPService,
        @inject('ClientRegisterStrategy') private clientRegister: IRegisterStrategy,
        @inject('VendorRegisterStrategy') private vendorRegister: IRegisterStrategy,
        @inject('AdminRegisterStrategy') private adminRegister : IRegisterStrategy
    ){
        this.strategies = {
            admin: this.adminRegister,
            client: this.clientRegister,
            vendor: this.vendorRegister
        };
    }
   async execute(email: string, otp: string): Promise<void> {
        const isValid = await this.otpService.verifyOTP(email, otp)
        if(!isValid){
            throw new CustomError("Invalid or expired OTP",HTTP_STATUS.BAD_REQUEST)
        }
        const user = await this.otpService.getPendingUser(email);
        if(!user) {
            throw new CustomError('No pending users found', HTTP_STATUS.NOT_FOUND);
        }

        const strategy=this.strategies[user.role];
        if(!strategy){
            throw new CustomError("Invalid user role", HTTP_STATUS.FORBIDDEN);
        }

        await strategy.register(user);
        await this.otpService.clearPendingUser(email);
    }
}
