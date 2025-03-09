import { IPermissions } from "../../infrastructure/database/models/admin.model";
import { UserRoles } from "../../shared/utils/constants";
import { IBaseUser } from "./baseUser.entity";

export interface IAdmin extends IBaseUser{
   // role: UserRoles.ADMIN | UserRoles.SUPER_ADMIN;
   permissions:IPermissions
}