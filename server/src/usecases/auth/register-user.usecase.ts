import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "../interface/auth/IRegisterStrategy.interface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../shared/utils/CustomError";

import { IRegisterUserUseCase } from "../interface/auth/IRegisterUserUseCase.interface";
import { HTTP_STATUS } from "../../shared/utils/constants";
import { ClientRegisterStrategy } from "./register-strategies/client-register.stategy";
import { VendorRegisterStrategy } from "./register-strategies/vendor-register.stategy";
import { AdminRegisterStrategy } from "./register-strategies/admin-register.stategy";
import { IBaseUser } from "../../domain/entities/baseUser.entity";

@injectable()
export class RegisterUserUseCase  implements IRegisterUserUseCase {
  private strategies: Record< string, IRegisterStrategy>;
  constructor(
    @inject('ClientRegisterStrategy') private clientStrategy: IRegisterStrategy,
    @inject("VendorRegisterStrategy") private vendorStrategy: IRegisterStrategy,
    @inject('AdminRegisterStrategy') private adminStrategy: IRegisterStrategy,
  ){
    this.strategies = {
      admin: this.adminStrategy,
      client: this.clientStrategy,
      vendor: this.vendorStrategy
    }
  }
  async execute(user: UserDTO): Promise<void | IBaseUser> {
    const strategy =this.strategies[user.role];
    if(!strategy){
      throw new CustomError("Invalid user role", HTTP_STATUS.FORBIDDEN)
    }
   return await strategy.register(user)
  }

}
