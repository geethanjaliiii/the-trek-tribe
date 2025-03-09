import { model, ObjectId } from "mongoose";
import { IAdmin } from "../../../domain/entities/admin.entity";
import { AdminSchema } from "../mongoDB/schemas/Admin.schema";

export interface IPermissions {
    canManageClients: boolean;
    canManageVendors: boolean;
    canModifyAdmins: boolean;
  }
export interface IAdminModel extends Omit<IAdmin, '_id'>,Document {
    _id: ObjectId;
    permissions: IPermissions
}

export const AdminModel = model<IAdminModel>("Admin",AdminSchema)