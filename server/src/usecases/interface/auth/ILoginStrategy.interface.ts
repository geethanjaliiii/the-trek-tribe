import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";

export interface ILoginStrategy {
    login(user: LoginUserDTO): Promise<IBaseUser | void>
}