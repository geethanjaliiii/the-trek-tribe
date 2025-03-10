import { inject, injectable } from "tsyringe";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { ILoginStrategy } from "../../interface/auth/ILoginStrategy.interface";
import { IBcrypt } from "../../../infrastructure/services/security/interface/bcrypt.interface";
import { IAdminRepository } from "../../../domain/repositories/admin/adminRepository.interface";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/utils/constants";
import { IAdmin } from "../../../domain/entities/admin.entity";

@injectable()
export class AdminLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IAdminRepository") private adminRepo: IAdminRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
  ) {}
  async login(user: LoginUserDTO): Promise<IAdmin | void> {
    const { email, password } = user;
    if (!email || !password) {
      throw new CustomError(
        ERROR_MESSAGES.MISSING_PARAMETERS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const admin = await this.adminRepo.findByEmail(email);
    if (!admin) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    if (!admin.isActive) {
      throw new CustomError(ERROR_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }
    const isPasswordSame = await this.passwordBcrypt.compare(
      password,
      admin.password
    );
    if (!isPasswordSame) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return admin;
  }
}
