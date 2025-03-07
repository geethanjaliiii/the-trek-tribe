import { inject, injectable } from "tsyringe";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { ILoginStrategy } from "../../interface/auth/ILoginStrategy.interface";
import { IAdminRepository } from "../../../domain/repositories/admin/adminRepository.interface";
import { IBcrypt } from "../../../infrastructure/services/security/interface/bcrypt.interface";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/utils/constants";
import { IVendorRepository } from "../../../domain/repositories/vendor/vendorRepository.interface";

@injectable()
export class VendorLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IVendorRepository") private vendorRepo: IVendorRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
  ) {}
  async login(user: LoginUserDTO): Promise<IBaseUser | void> {
    const { email, password } = user;
    if (!email || !password) {
      throw new CustomError(
        ERROR_MESSAGES.MISSING_PARAMETERS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const vendor = await this.vendorRepo.findByEmail(email);
    if (!vendor) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    if (!vendor.isActive) {
      throw new CustomError(ERROR_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }
    const isPasswordSame = await this.passwordBcrypt.compare(
      password,
      vendor.password
    );
    if (!isPasswordSame) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return vendor;
  }
}
