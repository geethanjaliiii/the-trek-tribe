import { inject, injectable } from "tsyringe";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/utils/constants";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { ILoginStrategy } from "../../interface/auth/ILoginStrategy.interface";
import { IVendorRepository } from "../../../domain/repositories/vendor/vendorRepository.interface";

@injectable()
export class VendorGoogleLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  async login(user: LoginUserDTO): Promise<Partial<IBaseUser> | void> {
    const vendor = await this.vendorRepository.findByEmail(user.email);
    if (vendor) {
      if (vendor.status !== "active") {
        throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN);
      }
    }

    return vendor as Partial<IBaseUser>;
  }
}