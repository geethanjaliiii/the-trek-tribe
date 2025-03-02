import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "../interface/auth/IRegisterStrategy.interface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../shared/utils/CustomError";
import { EMAIL_SUBJECT, ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";
import { IRegisterUserUseCase } from "../interface/auth/IRegisterUserUseCase.interface";
import { IBaseUser } from "../../domain/entities/baseUser.entity";
import { IEmailService } from "../../infrastructure/services/email/IEmailService.interface";
import { IOTPService } from "../../infrastructure/services/otp/IOTPService.interface";
import { IClientRepository } from "../../domain/repositories/client/clientRepository.interface";
import { IAdminRepository } from "../../domain/repositories/admin/adminRepository.interface";
import { IVendorRepository } from "../../domain/repositories/vendor/vendorRepository.interface";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject("IEmailService") private emailService: IEmailService,
    @inject("IOTPService") private otpService:IOTPService,
    @inject("IClientRepository") private clientRepository :IClientRepository,
    @inject("IAdminRepository") private adminRepository: IAdminRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  private async validateUser(email: string): Promise<boolean> {
    const [client, vendor, admin]=await Promise.all([
        this.clientRepository.findByEmail(email),
        this.vendorRepository.findByEmail(email),
        this.adminRepository.findByEmail(email)
    ]);

    return Boolean(client || vendor || admin);
  }

  async execute(user: UserDTO): Promise<void> {
    
    const emailAlreadyExist =await this.validateUser(user.email.toLowerCase().trim())

    if(emailAlreadyExist){
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }
    const {email, }=user as UserDTO;
    //get otp
    const otp = await this.otpService.generateOTP(email)
    //send email
    await this.emailService.sendEmail(email,EMAIL_SUBJECT,`Your OTP is: ${otp}. Expires in 10 minutes`);
}
}
