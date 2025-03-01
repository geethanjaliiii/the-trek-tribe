import { model, ObjectId } from "mongoose";
import { IAdmin } from "../../../domain/entities/admin.entity";

export interface IAdminModel extends Omit<IAdmin, '_id'>,Document {
    _id: ObjectId;
}

export const AdminModel = model<IAdminModel>("Admin")