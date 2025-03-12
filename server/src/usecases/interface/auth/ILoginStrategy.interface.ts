import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { IUser, LoginUserDTO } from "../../../shared/dtos/user.dto";

export interface ILoginStrategy {
    login(user: LoginUserDTO): Promise<IUser | void|Partial<IBaseUser>>
}