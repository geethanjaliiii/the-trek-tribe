import { inject,injectable } from "tsyringe";
import { IRegisterStrategy } from "../interface/auth/IRegisterStrategy.interface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../shared/utils/CustomError";
import { HTTP_STATUS } from "../../shared/utils/constants";
import { IRegisterUserUseCase } from "../interface/auth/IRegisterUserUseCase.interface";
import { IBaseUser } from "../../domain/entities/baseUser.entity";


@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
        private strategies: Record<string, IRegisterStrategy>;

    constructor(
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
   async  execute(user:UserDTO): Promise<void> {
    const strategy =this.strategies[user.role];
    if(!strategy){
        throw new CustomError("Invalid user role",HTTP_STATUS.FORBIDDEN)
    }
    await strategy.register(user)
    }

    
}