import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { IClient } from "../../../domain/entities/client.entity";
import { UserDTO } from "../../../shared/dtos/user.dto";

export interface IRegisterStrategy {
    register(user:UserDTO): Promise<IBaseUser | void>;
}