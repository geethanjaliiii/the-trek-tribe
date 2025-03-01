import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { UserDTO } from "../../../shared/dtos/user.dto";

export interface IRegisterUserUseCase {
    execute(user: UserDTO):Promise<void>;
}