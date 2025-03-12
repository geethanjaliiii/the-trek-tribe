import { UserRoles } from "../../shared/utils/constants";
import { IBaseUser } from "./baseUser.entity";

export interface IClient extends IBaseUser {
    clientId: string
    status:string
    googleId?:string
   // role:UserRoles.CLIENT
}