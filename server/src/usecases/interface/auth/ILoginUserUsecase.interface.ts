import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { IUser, LoginUserDTO } from "../../../shared/dtos/user.dto";

export interface ILoginUserUseCase {
    execute(user: LoginUserDTO): Promise<void |Partial<IUser>>
}