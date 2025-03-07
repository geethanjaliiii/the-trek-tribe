import { inject, injectable } from "tsyringe";
import { IBaseUser } from "../../domain/entities/baseUser.entity";
import { LoginUserDTO } from "../../shared/dtos/user.dto";
import { ILoginUserUseCase } from "../interface/auth/ILoginUserUsecase.interface";
import { ClientLoginStrategy } from "./login-strategies/client-login.strategy"; 
import { AdminLoginStrategy } from "./login-strategies/admin-login.strategy";
import { VendorLoginStrategy } from "./login-strategies/vendor-login.strategy"; 
import { ILoginStrategy } from "../interface/auth/ILoginStrategy.interface";
import { CustomError } from "../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
    private strategies: Record<string, ILoginStrategy>;
  constructor(
    @inject("ClientLoginStrategy") private clientStrategy: ClientLoginStrategy,
    @inject("AdminLoginStrategy") private adminStrategy: AdminLoginStrategy,
    @inject("VendorLoginStrategy") private vendorStrategy: VendorLoginStrategy
  ) {
    this.strategies={
        admin: adminStrategy,
        client:clientStrategy,
        vendor:vendorStrategy
    }
  }
  async execute(user: LoginUserDTO): Promise<void | Partial<IBaseUser>> {
 const strategy =this.strategies[user.role]
 if(!strategy){
    throw new CustomError('Invalid user role for login', HTTP_STATUS.FORBIDDEN)
 }
 return await strategy.login(user)
  }
}
