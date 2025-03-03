import { UserRoles } from "../../shared/utils/constants";
import { IBaseUser } from "./baseUser.entity";

export interface IClient extends IBaseUser {
    clientId: string
   // role:UserRoles.CLIENT
}